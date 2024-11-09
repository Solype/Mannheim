from fastapi import HTTPException, Request


from server.utils import extract_players_from_file
from server.access_manager import verify_header
from server.server import app
from server.db import db


@app.get('/session/{session_id:int}/characters')
def route(header: Request, session_id : int):
    if not verify_header(header.headers.items()):
        raise HTTPException(status_code=401, detail="Unauthentificated")
    return f"Success {session_id}", 200