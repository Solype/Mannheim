from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.mysql_db import getone_db, modify_db, get_db
from server.access_manager import access_manager
from server.routes.server_datatype.session_type import PawnSeed


@app.post("/api/my/session/pawn", tags=["Pawn"])
async def create_pawn(session_id: int, pawn: PawnSeed, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Not Authentificated")
    
    user_id = access_manager.getTokenData(token).id
    gm_id = getone_db("SELECT gamemaster_id FROM `sessions` WHERE id = %s", (session_id,))

    if (gm_id != user_id) :
        raise HTTPException(status_code=403, detail="Not the GameMaster")
