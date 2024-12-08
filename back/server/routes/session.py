from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.mysql_db import getone_db, modify_db, get_db
from server.access_manager import access_manager
from server.routes.server_datatype.session_type import SessionShort



def compose_session_short(session_id: int) -> SessionShort:
    session = getone_db("SELECT id, gm_id, name, description FROM `sessions` WHERE id = %s", (session_id,))
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    gm_name = getone_db("SELECT username FROM `users` WHERE id = %s", (session[1],))
    if not gm_name:
        raise HTTPException(status_code=404, detail="GM not found")

    return SessionShort(id=session[0], gm_id=session[1], gm_name=gm_name[0], name=session[2], description=session[3])




@app.get("/api/my/sessions", tags=["Session"])
def get_my_session(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[SessionShort]:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    user_id = access_manager.getTokenData(token).id

    session_i_am_in = get_db("SELECT session_id FROM `session_participant` WHERE user_id = %s", (user_id,))
    return [compose_session_short(session_id[0]) for session_id in session_i_am_in]

@app.get("/api/my/owned/sessions", tags=["Session"])
def get_my_owned_session(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[SessionShort]:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    user_id = access_manager.getTokenData(token).id

    session_i_own = get_db("SELECT id FROM `sessions` WHERE gm_id = %s", (user_id,))
    return [compose_session_short(session_id[0]) for session_id in session_i_own]




@app.post("/api/my/session", tags=["Session"])
async def create_session(session: SessionShort, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    user_id = access_manager.getTokenData(token).id

    success = modify_db("INSERT INTO `sessions` (gm_id, name, description) VALUES (%s, %s, %s)", (user_id, session.name, session.description))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to create session")
    return


@app.put("/api/my/session/{id}", tags=["Session"])
async def modify_session(id: int, session: SessionShort, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    user_id = access_manager.getTokenData(token).id

    owner = getone_db("SELECT gm_id FROM `sessions` WHERE id = %s", (id,))
    if not owner:
        raise HTTPException(status_code=404, detail="Session not found")

    if owner[0] != user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    success = modify_db("UPDATE `sessions` SET name = %s, description = %s WHERE id = %s AND gm_id = %s", (session.name, session.description, id, user_id))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to modify session")
    return


@app.delete("/api/my/session/{id}", tags=["Session"])
async def delete_session(id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    user_id = access_manager.getTokenData(token).id

    owner = getone_db("SELECT gm_id FROM `sessions` WHERE id = %s", (id,))
    if not owner:
        raise HTTPException(status_code=404, detail="Session not found")

    if owner[0] != user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    success = modify_db("DELETE FROM `sessions` WHERE id = %s AND gm_id = %s", (id, user_id))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to delete session")
    return
