from fastapi import FastAPI
from typing import AsyncIterator
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from server.db.dbconnection import db
import uvicorn


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    global db
    print("Le serveur démarre !")
    db.setPath("server/db/db.sqlite")
    try:
        yield
    finally:
        print("Le serveur s'arrête !")
        db.quit()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permet à toutes les origines
    allow_credentials=True,
    allow_methods=["*"],  # Permet toutes les méthodes HTTP
    allow_headers=["*"],  # Permet tous les en-têtes
)

import server.routes
