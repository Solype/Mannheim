from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.mysql_db import getone_db, modify_db, get_db
from server.access_manager import access_manager
from server.routes.server_datatype.user_request_type import UserPawnRequest, UserPawnRequestCreate
from server.routes.server_datatype.chara_type import CharaAllData
from typing import Optional, Literal
import json

def compose_character_request(request_id: int, session_id: int, character_id: int, sender_id: int, receiver_id: int, status: str = "pending") -> UserPawnRequest:
    sender_name = getone_db("SELECT name FROM `users` WHERE id = %s", (sender_id,))[0]
    receiver_name = getone_db("SELECT name FROM `users` WHERE id = %s", (receiver_id,))[0]
    session_name = getone_db("SELECT name FROM `sessions` WHERE id = %s", (session_id,))[0]
    character_name = getone_db("SELECT name FROM `characters` WHERE id = %s", (character_id,))[0]
    return UserPawnRequest(
        request_id=request_id,
        sender_id=sender_id,
        sender_name=sender_name,
        session_id=session_id,
        session_name=session_name,
        character_id=character_id,
        character_name=character_name,
        receiver_id=receiver_id,
        receiver_name=receiver_name,
        status=status
    )


@app.get("/api/my/session/pawn/requests")
def get_my_pawn_requests(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[UserPawnRequest]:
    if (not access_manager.isTokenValid(credentials.credentials)):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(credentials.credentials).id

    requests = get_db("SELECT id, session_id, character_id, sender_id, receiver_id status FROM `characters_requests` WHERE receiver_id = %s AND status = 'pending'", (user_id,))

    return [compose_character_request(request_id[0], request_id[1], request_id[2], request_id[3], request_id[4]) for request_id in requests]    


@app.get("/api/my/session/pawn/requests/sent")
def get_my_pawn_requests_sent(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[UserPawnRequest]:
    if (not access_manager.isTokenValid(credentials.credentials)):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(credentials.credentials).id

    requests = get_db("SELECT id, session_id, character_id, sender_id, receiver_id, status FROM `characters_requests` WHERE sender_id = %s", (user_id,))

    return [compose_character_request(request_id[0], request_id[1], request_id[2], request_id[3], request_id[4], request_id[5]) for request_id in requests]


@app.post("/api/my/session/pawn/request")
def post_new_pawn(data: UserPawnRequestCreate, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    if (not access_manager.isTokenValid(credentials.credentials)):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(credentials.credentials).id

    # to do : check if the invitation is not already sent

    chara_owner = getone_db("SELECT user_id FROM `characters` WHERE id = %s", (data.character_id))
    if (not chara_owner) :
        raise HTTPException(status_code=404, detail="chara not found")
    if (chara_owner[0] != user_id) :
        raise HTTPException(status_code=401, detail="Unauthorized")

    receiver_id = getone_db("SELECT gamemaster_id FROM `sessions` WHERE id = %s", (data.session_id,))
    if not receiver_id:
        raise HTTPException(status_code=404, detail="Session not found")
    receiver_id = receiver_id[0]

    if receiver_id == user_id:
        raise HTTPException(status_code=500, detail="You cannot invite yourself")

    already_sent = getone_db("SELECT id FROM `characters_requests` WHERE session_id = %s AND character_id = %s", (data.session_id, data.character_id))
    if already_sent:
        raise HTTPException(status_code=400, detail="Already sent")

    success = modify_db("INSERT INTO `characters_requests` (sender_id, receiver_id, session_id, character_id, status) VALUES (%s, %s, %s, %s, 'pending')", (user_id, receiver_id, data.character_id, data.session_id))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to send character request")
    return


@app.post("/api/my/session/pawn/request/{request_id}/accept")
def accept_pawn_request(request_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    if (not access_manager.isTokenValid(credentials.credentials)):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(credentials.credentials).id

    request = getone_db("SELECT receiver_id, session_id, character_id FROM `characters_requests` WHERE id = %s AND status = 'pending'", (request_id,))
    if not request:
        raise HTTPException(status_code=404, detail="Character request not found")

    if request[0] != user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    success = modify_db("UPDATE `characters_requests` SET status = 'accepted' WHERE id = %s", (request_id,))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to accept character request")

    players_in_sessions = get_db("SELECT user_id FROM `session_participants` WHERE session_id = %s", (request[1],))
    if not players_in_sessions:
        raise HTTPException(status_code=500, detail="Failed to get players in session")

    for player in players_in_sessions:
        does_the_player_have_access = getone_db("SELECT id FROM `characters_access` WHERE character_id = %s AND player_id = %s", (request[2], player[0]))
        if does_the_player_have_access:
            continue
        success = modify_db("INSERT INTO `characters_access` (character_id, player_id) VALUES (%s, %s)", (request[2], player[0]))
        if not success:
            raise HTTPException(status_code=500, detail="Failed to grant access to character")
    return

@app.post("/api/my/session/pawn/request/{request_id}/decline")
def reject_pawn_request(request_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    if (not access_manager.isTokenValid(credentials.credentials)):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(credentials.credentials).id

    request = getone_db("SELECT receiver_id FROM `characters_requests` WHERE id = %s AND status = 'pending'", (request_id,))
    if not request:
        raise HTTPException(status_code=404, detail="Character request not found")

    if request[0] != user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    success = modify_db("UPDATE `characters_requests` SET status = 'refused' WHERE id = %s AND status = 'pending'", (request_id,))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to reject character request")
    return


@app.delete("/api/my/session/pawn/request/{request_id}")
def delete_pawn_request(request_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    if (not access_manager.isTokenValid(credentials.credentials)):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(credentials.credentials).id

    request = getone_db("SELECT sender_id FROM `characters_requests` WHERE id = %s AND status = 'pending'", (request_id,))
    if not request:
        raise HTTPException(status_code=404, detail="Character request not found")

    if request[0] != user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    success = modify_db("DELETE FROM `characters_requests` WHERE id = %s", (request_id,))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to delete character request")
    return