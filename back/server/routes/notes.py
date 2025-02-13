from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.mysql_db import getone_db, modify_db, get_db
from server.access_manager import access_manager
from server.socket_message.ping import emit_note
from server.routes.server_datatype.session_type import Note, NoteContent


@app.get("/api/my/session/{id}/notes", tags=["Notes"])
async def get_notes(id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[Note]:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    gm = getone_db("SELECT gamemaster_id FROM `sessions` WHERE id = %s", (id,))
    if not gm:
        raise HTTPException(status_code=404, detail="Session not found")

    notes = get_db("SELECT id, note FROM `session_notes` WHERE session_id = %s AND public = %s", (id, gm[0] != user_id))
    if not notes:
        raise HTTPException(status_code=404, detail="Notes not found")

    return [Note(id=n[0], content=n[1]) for n in notes] 


@app.post("/api/my/session/{id}/notes", tags=["Notes"])
async def create_note(id: int, data: NoteContent, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    gm = getone_db("SELECT gamemaster_id FROM `sessions` WHERE id = %s", (id,))
    if not gm:
        raise HTTPException(status_code=404, detail="Session not found")

    public = gm[0] != user_id

    modify_db("INSERT INTO `session_notes` (note, session_id, public) VALUES (%s, %s, %s)", (data.content, id, public))
    note_id = getone_db("SELECT id FROM session_notes WHERE session_id = %s AND public = %s ORDER BY id DESC LIMIT 1;", (id, public, ))[0]
    note = Note(id=note_id, content=data.content)
    await emit_note(id, note, public)
