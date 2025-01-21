from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.mysql_db import getone_db, modify_db, get_db
from server.access_manager import access_manager
from server.routes.server_datatype.session_type import SessionShort, CreateSessionRequest, SessionLong, Player, Pawn, Monitor
from typing import Optional



def compose_session_short(session_id: int) -> SessionShort:
    session = getone_db("SELECT id, gamemaster_id, name, description FROM `sessions` WHERE id = %s", (session_id,))
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

    session_i_am_in = get_db("SELECT session_id FROM `session_participants` WHERE user_id = %s", (user_id,))
    return [compose_session_short(session_id[0]) for session_id in session_i_am_in]

@app.get("/api/my/owned/sessions", tags=["Session"])
def get_my_owned_session(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[SessionShort]:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    user_id = access_manager.getTokenData(token).id

    session_i_own = get_db("SELECT id FROM `sessions` WHERE gamemaster_id = %s", (user_id,))
    return [compose_session_short(session_id[0]) for session_id in session_i_own]



@app.post("/api/my/session", tags=["Session"])
async def create_session(session : CreateSessionRequest, credentials: HTTPAuthorizationCredentials = Depends(security)) -> SessionShort:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    user_id = access_manager.getTokenData(token).id

    success = modify_db("INSERT INTO `sessions` (gamemaster_id, name, description) VALUES (%s, %s, %s)", (user_id, session.name, session.description))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to create session")
    new_session_id = getone_db("SELECT id FROM `sessions` WHERE gamemaster_id = %s AND name = %s AND description = %s ORDER BY id DESC LIMIT 1",
                                (user_id, session.name, session.description))[0]

    success = modify_db("INSERT INTO `session_participants` (user_id, session_id) VALUES (%s, %s)", (user_id, new_session_id))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to create link between user and session")

    return compose_session_short(new_session_id)


@app.put("/api/my/session/{id}", tags=["Session"])
async def modify_session(id: int, session: SessionShort, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    user_id = access_manager.getTokenData(token).id

    owner = getone_db("SELECT gamemaster_id FROM `sessions` WHERE id = %s", (id,))
    if not owner:
        raise HTTPException(status_code=404, detail="Session not found")

    if owner[0] != user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    success = modify_db("UPDATE `sessions` SET name = %s, description = %s WHERE id = %s AND gamemaster_id = %s", (session.name, session.description, id, user_id))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to modify session")
    return


@app.delete("/api/my/session/{id}", tags=["Session"])
async def delete_session(id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    user_id = access_manager.getTokenData(token).id

    owner = getone_db("SELECT gamemaster_id FROM `sessions` WHERE id = %s", (id,))
    if not owner:
        raise HTTPException(status_code=404, detail="Session not found")

    if owner[0] != user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    success = modify_db("DELETE FROM `sessions` WHERE id = %s AND gamemaster_id = %s", (id, user_id))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to delete session")
    return




def compose_pawn(pawn : tuple, is_gm : bool) -> Optional[Pawn] :
    if (is_gm or pawn[14] == None) :
        return  Pawn(id=pawn[0], name=pawn[1], chara_id=pawn[2],
                        physical=Monitor(current=pawn[3], max=pawn[8]),
                        mental=Monitor(current=pawn[4], max=pawn[9]),
                        pathological=Monitor(current=pawn[5], max=pawn[10]),
                        endurance=Monitor(current=pawn[6], max=pawn[11]),
                        mana=Monitor(current=pawn[7], max=pawn[12]),
                        side=pawn[13])

    if (pawn[14] == "partially") :
        return Pawn(id=pawn[0], name=pawn[1], chara_id=pawn[2], physical= None, mental= None, pathological= None, endurance= None, mana= None, side=pawn[13])

    if (pawn[14] == "totally") :
        return None

@app.get("/api/test/get_pawns_of_session/{session_id}/{is_gm}", tags=["Session"])
def get_pawns_of_session(session_id: int, is_gm : bool) -> list[Pawn]:
    pawns = get_db("""SELECT id, name, character_id,
                   current_physical_health, current_mental_health, current_path_health, current_endurance, current_mana,
                   max_physical_health, max_mental_health, max_path_health, max_endurance, max_mana, side_camp, hidden
                   FROM `entities`
                   WHERE session_id = %s""", (session_id,))

    return [
        result for pawn in pawns
        if (result := compose_pawn(pawn, is_gm)) is not None
    ]



@app.get("/api/session/{id}", tags=["Session"])
async def get_session(id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> SessionLong:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    user_id = access_manager.getTokenData(token).id

    session = compose_session_short(id)

    players = get_db("SELECT user_id FROM `session_participants` WHERE session_id = %s", (id,))

    if not players:
        raise HTTPException(status_code=404, detail="Session not found")

    player_ids = [player[0] for player in players]
    if user_id not in player_ids:
        raise HTTPException(status_code=401, detail="Unauthorized")

    names = [getone_db("SELECT username FROM `users` WHERE id = %s", (player_id,))[0] for player_id in player_ids]
    players = [Player(id=player_id, name=name) for player_id, name in zip(player_ids, names)]

    pawns = get_pawns_of_session(id, getone_db("SELECT name FROM sessions WHERE id = %s AND gamemaster_id = %s", (id, user_id) != None))

    return SessionLong(
        id=session.id,
        gm_id=session.gm_id,
        gm_name=session.gm_name,
        name=session.name,
        description=session.description,
        players=players,
        entities=pawns
    )

