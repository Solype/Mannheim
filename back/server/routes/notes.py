from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.mysql_db import getone_db, modify_db, get_db
from server.access_manager import access_manager
from server.socket_message.ping import emit_note, emit_delete_note
from server.routes.server_datatype.session_type import Note, NoteContent


@app.get("/api/my/session/{session_id}/notes", tags=["Notes"])
async def get_notes(session_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[Note]:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    gm = getone_db("SELECT gamemaster_id FROM `sessions` WHERE id = %s", (session_id,))
    if not gm:
        raise HTTPException(status_code=404, detail="Session not found")

    query_for_gm = "SELECT id, note, public FROM `session_notes` WHERE session_id = %s"
    tuple_for_gm = (session_id,)

    query_for_player = "SELECT id, note, public FROM `session_notes` WHERE session_id = %s AND public = %s"
    tuple_for_player = (session_id, True)

    is_gm = gm[0] == user_id

    notes = get_db(query_for_gm if is_gm else query_for_player, tuple_for_gm if is_gm else tuple_for_player)
    if notes == None:
        raise HTTPException(status_code=404, detail="Notes not found")

    return [Note(id=n[0], content=n[1], is_public=n[2]) for n in notes] 


@app.post("/api/my/session/{session_id}/notes", tags=["Notes"])
async def create_note(session_id: int, data: NoteContent, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    gm = getone_db("SELECT gamemaster_id FROM `sessions` WHERE id = %s", (session_id,))
    if not gm:
        raise HTTPException(status_code=404, detail="Session not found")

    public = gm[0] != user_id

    note_id = modify_db("INSERT INTO `session_notes` (note, session_id, public) VALUES (%s, %s, %s)", (data.content, id, public))
    if note_id == None:
        raise HTTPException(status_code=500, detail="Failed to create note")
    note = Note(id=note_id, content=data.content, is_public=public)
    await emit_note(session_id, note)

@app.delete("/api/my/session/{session_id}/notes/{note_id}", tags=["Notes"])
async def delete_note(session_id: int, note_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    gm = getone_db("SELECT gamemaster_id FROM `sessions` WHERE id = %s", (session_id,))
    if not gm:
        raise HTTPException(status_code=404, detail="Session not found")
    if gm[0] != user_id:
        raise HTTPException(status_code=403)

    success = modify_db("DELETE FROM `session_notes` WHERE id = %s AND session_id = %s", (note_id, session_id))
    if success == None:
        raise HTTPException(status_code=500, detail="Failed to delete note")
    await emit_delete_note(session_id, note_id)

@app.put("/api/my/session/{session_id}/notes/{note_id}", tags=["Notes"])
async def modify_note(session_id: int, note_id: int, data: NoteContent, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    note = getone_db("SELECT public FROM `session_notes` WHERE id = %s AND session_id = %s", (note_id, session_id))
    if note == None:
        raise HTTPException(status_code=404, detail="Note not found")

    gm = getone_db("SELECT gamemaster_id FROM `sessions` WHERE id = %s", (session_id,))
    if not gm:
        raise HTTPException(status_code=404, detail="Session not found")
    if gm[0] != user_id:
        raise HTTPException(status_code=403)

    success = modify_db("UPDATE `session_notes` SET note = %s WHERE id = %s AND session_id = %s", (data.content, note_id, session_id))
    if success == None:
        raise HTTPException(status_code=500, detail="Failed to modify note")
    await emit_note(session_id, Note(id=note_id, content=data.content, is_public=note[0]))

@app.put("/api/my/session/{session_id}/notes/{note_id}/public", tags=["Notes"])
async def modify_note_public(session_id: int, note_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    gm = getone_db("SELECT gamemaster_id FROM `sessions` WHERE id = %s", (session_id,))
    if not gm:
        raise HTTPException(status_code=404, detail="Session not found")
    if gm[0] != user_id:
        raise HTTPException(status_code=403)

    note = getone_db("SELECT public, note FROM `session_notes` WHERE id = %s AND session_id = %s", (note_id, session_id))
    if note == None:
        raise HTTPException(status_code=404, detail="Note not found")

    success = modify_db("UPDATE `session_notes` SET public = %s WHERE id = %s AND session_id = %s", (not note[0], note_id, session_id))
    if success == None:
        raise HTTPException(status_code=500, detail="Failed to modify note")

    await emit_delete_note(session_id, note_id)
    await emit_note(session_id, Note(id=note_id, content=note[1], is_public=not note[0]))