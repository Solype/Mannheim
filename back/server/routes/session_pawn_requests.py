from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.mysql_db import getone_db, modify_db, get_db
from server.access_manager import access_manager
from server.routes.server_datatype.session_type import SessionShort, CreateSessionRequest, SessionLong, Player, Pawn, Monitor, PawnSeed
from server.routes.server_datatype.chara_type import CharaAllData
from typing import Optional, Literal
import json

@app.get("/api/my/session/pawn/requests")
def get_my_pawn_requests():
    pass

@app.get("/api/my/session/pawn/requests/sent")
def get_my_pawn_requests_sent():
    pass

@app.post("/api/my/session/pawn/request")
def post_new_pawn():
    pass

@app.post("/api/my/session/pawn/request/accept")
def accept_pawn_request():
    pass

@app.post("/api/my/session/pawn/request/reject")
def reject_pawn_request():
    pass

@app.delete("/api/my/session/pawn/request")
def delete_pawn_request():
    pass