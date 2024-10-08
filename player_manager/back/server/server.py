from fastapi import Request, HTTPException, FastAPI, Query, Response, Header, Depends
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from fastapi.middleware.cors import CORSMiddleware
from server.mysql_db import cursor, mydb


async def lifespan(app: FastAPI):
    print("Le serveur s'initialise !", flush=True)
    cursor.execute("USE mannheim")
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

security = HTTPBearer()

import server.routes

print("Server route loaded !", flush=True)
