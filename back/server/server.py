from fastapi import Request, HTTPException, FastAPI, Query, Response, Header, Depends
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from fastapi.middleware.cors import CORSMiddleware
from server.mysql_db import get_connection, wait_for_db
from server.socket import socketio_mount

async def lifespan(app: FastAPI):
    print("Le serveur s'initialise !", flush=True)
    wait_for_db()
    mydb = get_connection()
    cursor = mydb.cursor()
    cursor.execute("USE mannheim")
    cursor.execute("SET NAMES utf8mb4;")
    cursor.execute("SET CHARACTER SET utf8mb4;")
    cursor.execute("SET collation_connection = 'utf8mb4_unicode_ci';")

    mydb.commit()
    try:
        yield
    finally:
        print("Le serveur s'arrête !", flush=True)
        mydb.commit()
        cursor.close()
        mydb.close()

app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sio = socketio_mount(app)

security = HTTPBearer()

import server.routes
import server.socket_message

print("Server route loaded !", flush=True)
