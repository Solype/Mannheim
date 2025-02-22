from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.routes.server_datatype.chara_type import *
from server.mysql_db import get_db, getone_db, modify_db
from server.access_manager import access_manager


import json

@app.get("/api/my/characters", tags=["Character"])
async def my_characters(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[CharaAllDataWithIdShort]:
    token = credentials.credentials

    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id
    characters = get_db("SELECT id, character_data FROM `characters` WHERE user_id = %s AND type = 'chara'", (user_id,))

    result = [
        CharaAllDataWithIdShort(
            **{**json.loads(char_data), "id": char_id}
        )
        for char_id, char_data in characters
    ]

    return result

@app.get("/api/my/monsters", tags=["Character"])
async def my_monsters(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[CharaAllDataWithIdShort]:
    token = credentials.credentials

    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401) if not token else HTTPException(status_code=403, detail="Unauthorized")

    user_id = access_manager.getTokenData(token).id
    characters = get_db("SELECT id, character_data FROM `characters` WHERE user_id = %s AND type = 'monster'", (user_id,))

    result = [
        CharaAllDataWithIdShort(
            **{**json.loads(char_data), "id": char_id}
        )
        for char_id, char_data in characters
    ]
    return result

@app.get("/api/my/characters/{id}", tags=["Character"])
async def get_one_character(id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> CharaAllData:
    token = credentials.credentials

    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    data = access_manager.getTokenData(token).id

    character = getone_db("SELECT character_data, user_id FROM `characters` WHERE id = %s", (id,))
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")

    owner_id = character[1]

    if owner_id != data:
        fst_request = getone_db("SELECT id FROM `characters_access` WHERE character_id = %s AND player_id = %s", (id, data))
        snd_request = getone_db("SELECT id FROM `characters_requests` WHERE character_id = %s AND receiver_id = %s AND status != 'refused'", (id, data))
        if (not fst_request) and (not snd_request):
            raise HTTPException(status_code=403, detail="You don't have access to this character")

    character = json.loads(character[0])

    character = CharaAllData(**character)

    return character

@app.post("/api/my/characters", tags=["Character"])
async def create_character(character: CharaAllData, credentials: HTTPAuthorizationCredentials = Depends(security)) -> int:
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

@app.post("/api/my/monsters", tags=["Character"])
async def create_monster(character: CharaAllData, credentials: HTTPAuthorizationCredentials = Depends(security)) -> int:
    token = credentials.credentials

    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id
    json_data = json.dumps(character.model_dump())
    print(json_data, flush=True)
    modify_db("INSERT INTO `characters` (user_id, character_data, type) VALUES (%s, %s, 'monster')", (user_id, json_data, ))

    id_character = getone_db("SELECT id FROM `characters` WHERE user_id = %s ORDER BY id DESC LIMIT 1", (user_id,))
    print(id_character, flush=True)
    return id_character[0]

@app.put("/api/my/characters/{id}", tags=["Character"])
async def modify_character(id: int, character: CharaAllData, credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id
    json_data = json.dumps(character.model_dump())
    success = modify_db("UPDATE `characters` SET character_data = %s WHERE id = %s AND user_id = %s", (json_data, id, user_id, ))

    if success == None:
        raise HTTPException(status_code=404, detail="Character not found or you don't have access to it")

    return

