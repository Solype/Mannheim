from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.routes.server_datatype.chara_type import *
from server.mysql_db import get_db, getone_db, modify_db

from server.access_manager import access_manager

import json

@app.get("/api/my/characters")
async def my_characters(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[CharaAllDataWithIdShort]:
    token = credentials.credentials

    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id
    characters = get_db("SELECT * FROM `characters` WHERE user_id = %s", (user_id,))

    result = [
        CharaAllDataWithIdShort(
            **{**json.loads(char_data), "id": char_id}
        )
        for char_id, _, char_data in characters
    ]

    return result

@app.get("/api/my/characters/{id}")
async def get_one_character(id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> CharaAllData:
    token = credentials.credentials

    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    data = access_manager.getTokenData(token).id

    character = getone_db("SELECT character_data FROM `characters` WHERE id = %s AND user_id = %s", (id, data))
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")

    character = json.loads(character[0])

    character = CharaAllData(**character)

    return character

@app.post("/api/my/characters")
async def my_characters(character: CharaAllData, credentials: HTTPAuthorizationCredentials = Depends(security)) -> int:
    token = credentials.credentials

    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id
    json_data = json.dumps(character.model_dump())
    print(json_data, flush=True)
    modify_db("INSERT INTO `characters` (user_id, character_data) VALUES (%s, %s)", (user_id, json_data, ))

    id_character = getone_db("SELECT id FROM `characters` WHERE user_id = %s ORDER BY id DESC LIMIT 1", (user_id,))
    print(id_character, flush=True)
    return id_character[0]

@app.put("/api/my/characters/{id}")
async def my_characters(id: int, character: CharaAllData, credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id
    json_data = json.dumps(character.model_dump())
    success = modify_db("UPDATE `characters` SET character_data = %s WHERE id = %s AND user_id = %s", (json_data, id, user_id, ))

    if not success:
        raise HTTPException(status_code=404, detail="Character not found")

    return
