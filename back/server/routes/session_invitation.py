from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.mysql_db import getone_db, modify_db, get_db
from server.access_manager import access_manager
from server.routes.server_datatype.user_request_type import UserSessionRequest, UserSessionRequestCreate


def compose_session_request_with_session(session_id: int, session_name: str, gm_id: int, gm_name: str) -> UserSessionRequest:
    requests = get_db("SELECT id, receiver_id FROM `sessions_requests` WHERE session_id = %s", (session_id,))
    if not requests:
        raise HTTPException(status_code=404, detail="Session request not found")

    final = []
    for request in requests:
        receiver_name = getone_db("SELECT username FROM `users` WHERE id = %s", (request[1],))
        if not receiver_name:
            raise HTTPException(status_code=404, detail="Receiver not found")
        final.append(UserSessionRequest(
            request_id=request[0],
            session_id=session_id,
            session_name=session_name,
            gm_id=gm_id,
            gm_name=gm_name,
            receiver_id=request[1],
            receiver_name=receiver_name[0]
        ))
    return final


def compose_session_request(request_id: int, session_id: int, user_id: int, user_name: str) -> UserSessionRequest:
    session_infos = getone_db("SELECT name, gamemaster_id FROM `sessions` WHERE id = %s", (session_id,))
    if not session_infos:
        raise HTTPException(status_code=404, detail="Session request not found")
    session_name = session_infos[0]
    gm_id = session_infos[1]

    gm_name = getone_db("SELECT username FROM `users` WHERE id = %s", (gm_id,))
    if not gm_name:
        raise HTTPException(status_code=404, detail="GM not found")

    return UserSessionRequest(
        request_id=request_id,
        session_id=session_id,
        session_name=session_name,
        gm_id=gm_id,
        gm_name=gm_name[0],
        receiver_id=user_id,
        receiver_name=user_name[0]
    )



@app.get("/api/my/requests/sessions", tags=["Requests"])
def get_sessions_requests(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[UserSessionRequest]:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    user_id = access_manager.getTokenData(token).id
    my_name = getone_db("SELECT username FROM `users` WHERE id = %s", (user_id,))[0]
    requests = get_db("SELECT id, session_id FROM `sessions_requests` WHERE receiver_id = %s", (user_id,))
    return [compose_session_request(request[0], request[1], user_id, my_name) for request in requests]



@app.get("/api/my/requests/sessions/sent", tags=["Requests"])
def get_sent_sessions_requests(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[UserSessionRequest]:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    user_id = access_manager.getTokenData(token).id
    my_name = getone_db("SELECT username FROM `users` WHERE id = %s", (user_id,))[0]

    my_sessions = get_db("SELECT id, name FROM `sessions` WHERE gamemaster_id = %s", (user_id,))

    list_of_lists_of_requests = [compose_session_request_with_session(session_id[0], session_id[1], user_id, my_name) for session_id in my_sessions]
    final = []
    for list_of_requests in list_of_lists_of_requests:
        final.extend(list_of_requests)
    return final




@app.post("/api/my/requests/sessions", tags=["Requests"])
async def send_session_request(data: UserSessionRequestCreate, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    owner = getone_db("SELECT gamemaster_id FROM `sessions` WHERE id = %s", (data.session_id,))
    if not owner:
        raise HTTPException(status_code=404, detail="Session not found")

    if owner[0] != user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    success = modify_db("INSERT INTO `sessions_requests` (session_id, receiver_id, status) VALUES (%s, %s, 'pending')", (data.session_id, data.receiver_id))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to send session request")
    return

@app.delete("/api/my/requests/sessions/{request_id}", tags=["Requests"])
async def delete_session_request(request_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    session = getone_db("SELECT session_id FROM `sessions_requests` WHERE id = %s", (request_id,))
    if not session:
        raise HTTPException(status_code=404, detail="Session request not found")

    owner = getone_db("SELECT gamemaster_id FROM `sessions` WHERE id = %s", (session[0],))
    if not owner:
        raise HTTPException(status_code=404, detail="Session not found")

    if owner[0] != user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    success = modify_db("DELETE FROM `sessions_requests` WHERE id = %s", (request_id,))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to delete session request")
    return

@app.post("/api/my/requests/sessions/{request_id}/accept", tags=["Requests"])
async def accept_session_request(request_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    session = getone_db("SELECT session_id, receiver_id FROM `sessions_requests` WHERE id = %s AND status = 'pending'", (request_id,))
    if not session:
        raise HTTPException(status_code=404, detail="Session request not found")

    if session[1] != user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    success = modify_db("UPDATE `session_participants` SET user_id = %s WHERE session_id = %s", (user_id, session[0]))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to accept session request")
    
    success = modify_db("UPDATE `sessions_requests` SET status = 'accepted' WHERE id = %s", (request_id,))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to accept session request")
    return


@app.post("/api/my/requests/sessions/{request_id}/decline", tags=["Requests"])
async def decline_session_request(request_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    receiver = getone_db("SELECT receiver_id FROM `sessions_requests` WHERE id = %s AND status = 'pending'", (request_id,))
    if not receiver:
        raise HTTPException(status_code=404, detail="Session request not found")

    if receiver[0] != user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    success = modify_db("UPDATE `sessions_requests` SET status = 'refused' WHERE id = %s AND status = 'pending'", (request_id,))
    if not success:
        raise HTTPException(status_code=500, detail="Failed to decline session request")
    return
