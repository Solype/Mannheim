from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.routes.server_datatype.chara_type import *
from server.mysql_db import getone_db, modify_db
from server.access_manager import access_manager

@app.get("/api/my/requests/friends", tags=["Requests"])
async def get_friends_requests(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[int]:
    return []