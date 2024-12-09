from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.routes.server_datatype.chara_type import *
from server.mysql_db import getone_db, modify_db
from server.access_manager import access_manager

from server.routes.server_datatype.user_request_type import UserCharacterSessionRequest, UserSessionRequest

@app.get("/api/my/requests/sessions", tags=["Requests"])
async def get_sessions_requests(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[UserSessionRequest]:
    return []

@app.get("/api/my/requests/characters", tags=["Requests"])
async def get_characters_requests(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[UserCharacterSessionRequest]:
    return []
