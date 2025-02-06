from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.mysql_db import getone_db, modify_db, get_db
from server.access_manager import access_manager
from server.routes.server_datatype.session_type import SessionShort, CreateSessionRequest, SessionLong, Player, Pawn, Monitor, PawnSeed
from server.routes.server_datatype.chara_type import CharaAllData
from typing import Optional, Literal
import json



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
    print(token, flush=True)
    user_id = access_manager.getTokenData(token).id
    print(user_id, flush=True)
    if not user_id:
        raise HTTPException(status_code=500, detail="Failed to get sessions")
    session_i_am_in = get_db("SELECT session_id FROM `session_participants` WHERE user_id = %s", (user_id,))
    print(session_i_am_in, flush=True)
    if not session_i_am_in:
        raise HTTPException(status_code=500, detail="Failed to get sessions")
    lst = [compose_session_short(session_id[0]) for session_id in session_i_am_in]
    print("lst", flush=True)
    print(lst, flush=True)
    return lst

@app.get("/api/my/owned/sessions", tags=["Session"])
def get_my_owned_session(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[SessionShort]:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    user_id = access_manager.getTokenData(token).id

    session_i_own = get_db("SELECT id FROM `sessions` WHERE gamemaster_id = %s", (user_id,))
    lst = [compose_session_short(session_id[0]) for session_id in session_i_own]
    print(lst, flush=True)
    return lst



@app.post("/api/my/session", tags=["Session"])
async def create_session(session : CreateSessionRequest, credentials: HTTPAuthorizationCredentials = Depends(security)) -> SessionShort:
    token = credentials.credentials
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")

    token_data = access_manager.getTokenData(token)
    if not token_data or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    user_id = token_data.id

    success = modify_db(
        "INSERT INTO `sessions` (gamemaster_id, name, description) VALUES (%s, %s, %s)", 
        (user_id, session.name, session.description)
    )
    if not success:
        raise HTTPException(status_code=500, detail="Failed to create session")

    new_session_id = getone_db("SELECT id FROM `sessions` ORDER BY id DESC LIMIT 1", ())[0]

    success = modify_db(
        "INSERT INTO `session_participants` (user_id, session_id) VALUES (%s, %s)", 
        (user_id, new_session_id)
    )
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
        raise HTTPException(status_code=403)

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
        raise HTTPException(status_code=403)

    success = modify_db("DELETE FROM `sessions` WHERE id = %s AND gamemaster_id = %s", (id, user_id))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to delete session")
    return




def compose_pawn(pawn : tuple, is_gm : bool) -> Optional[Pawn] :
    if (is_gm or pawn[14] == None) :
        return  Pawn(id=pawn[0], name=pawn[1], chara_id=pawn[2],
                        physical=Monitor(current=pawn[3], max=pawn[8]),
                        mental=(Monitor(current=pawn[4], max=pawn[9]) if (pawn[9] != 0) else None),
                        pathological=(Monitor(current=pawn[5], max=pawn[10]) if (pawn[10] != 0) else None),
                        endurance=(Monitor(current=pawn[6], max=pawn[11]) if (pawn[11] != 0) else None),
                        mana=(Monitor(current=pawn[7], max=pawn[12]) if (pawn[12] != 0) else None),
                        side=pawn[13])

    if (pawn[14] == "partially") :
        return Pawn(id=pawn[0], name=pawn[1], chara_id=None, physical= None, mental= None, pathological= None, endurance= None, mana= None, side=pawn[13])

    if (pawn[14] == "totally") :
        return None

def get_pawns_of_session(session_id: int, is_gm : bool) -> list[Pawn]:
    print(is_gm)
    pawns = get_db("""SELECT id, name, character_id,
                   current_physical_health, current_mental_health, current_path_health, current_endurance, current_mana,
                   max_physical_health, max_mental_health, max_path_health, max_endurance, max_mana, side_camp, hidden
                   FROM `entities`
                   WHERE session_id = %s""", (session_id,))

    return [
        result for pawn in pawns
        if (result := compose_pawn(pawn, is_gm)) is not None
    ]



@app.get("/api/my/session/{id}", tags=["Session"])
async def get_session(id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> SessionLong:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    gm = getone_db("SELECT gamemaster_id FROM `sessions` WHERE id = %s", (id,))
    print(gm, id, flush=True)
    if not gm:
        raise HTTPException(status_code=404, detail="Session not found")

    gm_id = gm[0]

    user_id = access_manager.getTokenData(token).id

    session = compose_session_short(id)

    players = get_db("SELECT user_id FROM `session_participants` WHERE session_id = %s", (id,))
    if not players:
        raise HTTPException(status_code=404, detail="Session not found")

    print("processing players", flush=True)
    player_ids = [player[0] for player in players]
    if user_id not in player_ids and user_id != gm_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    print("User in session", flush=True)
    names = [getone_db("SELECT username FROM `users` WHERE id = %s", (player_id,))[0] for player_id in player_ids]
    players = [Player(id=player_id, name=name) for player_id, name in zip(player_ids, names)]

    print("gm_id", gm_id, "user_id", user_id, flush=True)
    pawns = get_pawns_of_session(id, user_id == gm_id)

    return SessionLong(
        id=session.id,
        gm_id=session.gm_id,
        gm_name=session.gm_name,
        name=session.name,
        description=session.description,
        players=players,
        pawns=pawns
    )


def insert_pawn_in_db(pawn : Pawn, hidden : Literal["totally", "partially", None], owner_id : int, session_id) :
    sql = """
        INSERT INTO `entities` (
            name, owner_id, session_id,
            current_physical_health, current_path_health, current_mental_health, current_endurance, current_mana,
            max_physical_health, max_mental_health, max_path_health, max_endurance, max_mana,
            character_id, side_camp, hidden
        ) VALUES (
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
        )
        """
    print("inserted pawn", pawn, flush=True)
    params = ( pawn.name, owner_id, session_id,
        pawn.physical.current, pawn.pathological.current, pawn.mental.current, pawn.endurance.current, pawn.mana.current,
        pawn.physical.max, pawn.mental.max, pawn.pathological.max, pawn.endurance.max, pawn.mana.max,
        pawn.chara_id, pawn.side, hidden)
    success = modify_db(sql, params)
    if (success != True) :
        raise HTTPException(status_code=500, detail="Failed to insert")
    print("inserted pawn success", flush=True)
    return


@app.post("/api/my/session/{session_id}/pawn", tags=["Pawn"])
async def create_pawn(session_id: int, pawn: PawnSeed, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Not Authentificated")
    
    user_id = access_manager.getTokenData(token).id
    gm_id = getone_db("SELECT gamemaster_id FROM sessions WHERE id = %s", (session_id,))

    if gm_id == None :
        raise HTTPException(status_code=404, detail="Session Not Found !")

    if (gm_id[0] != user_id) :
        raise HTTPException(status_code=403, detail="Not the GameMaster")

    chara_data_raw = getone_db("SELECT character_data FROM characters WHERE user_id = %s AND id = %s", (user_id, pawn.linked_id))
    if (chara_data_raw == None) :
        raise HTTPException(status_code=404, detail="Character not found !")

    chara_data_raw = chara_data_raw[0]
    chara_data_json = json.loads(chara_data_raw)

    chara : CharaAllData = CharaAllData(**chara_data_json)

    dictio = {}
    for skill in chara.skills :
        if skill.category == "resistance" :
            dictio[skill.name] = chara.attributes.resistance + skill.pureValue + skill.roleValue

    mana_monitor = Monitor(max=chara.other.mana, current=chara.other.mana) if chara.other != None else None
    physical_monitor = Monitor(max=dictio["physical"], current=dictio["physical"]) if "physical" in dictio.keys() else None
    mental_monitor = Monitor(max=dictio["mental"], current=dictio["mental"]) if "mental" in dictio.keys() else None
    pathological_monitor = Monitor(max=dictio["pathological"], current=dictio["pathological"]) if "pathological" in dictio.keys() else None
    endurance_monitor = Monitor(max=dictio["endurance"], current=dictio["endurance"]) if "endurance" in dictio.keys() else None


    to_insert : Pawn = Pawn(
        id = 0,
        chara_id = pawn.linked_id,
        name = chara.infos.name,
        mana = mana_monitor,
        physical = physical_monitor,
        mental = mental_monitor,
        pathological = pathological_monitor,
        endurance = endurance_monitor,
        side = pawn.side
    )
    insert_pawn_in_db(to_insert, pawn.hidden, user_id, session_id)
