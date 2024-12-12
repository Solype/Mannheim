from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.mysql_db import getone_db, modify_db, get_db
from server.access_manager import access_manager
from server.routes.server_datatype.user_request_type import UserSessionRequest


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



