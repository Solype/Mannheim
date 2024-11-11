from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.routes.server_datatype.chara_type import *
from server.mysql_db import getone_db, modify_db
from server.access_manager import access_manager


from fastapi.responses import FileResponse
from fastapi import File, UploadFile

import shutil
import os


@app.get("/api/magic_languages", tags=["Character Utils"])
async def magic_languages() -> list[str]:
    return ["Runique", "Elfique", "Terthan", "Latin", "Grec ancien", "Egyptien"]

@app.get("/api/metaraces", tags=["Character Utils"])
async def metaraces() -> list[str]:
    return ["Homme", "Elf", "Nain", "Orc", "Kobold"]

@app.get("/api/gods", tags=["Character Utils"])
async def gods() -> list[str]:
    return ["Slarn", "Naka", "Kelnemore", "Kelinenilek",
            "Le guardien de l'apocalypse", "Pereine", "Golakhan", "Cekeli",
            "Wenwali", "Xianlen", "Terlema", "Zihl"]

@app.get("/api/my/character/{id}/image", tags=["Character"])
async def get_character_image(id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> FileResponse:
    token = credentials.credentials

    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id
    character = getone_db("SELECT image FROM `characters` WHERE id = %s AND user_id = %s", (id, user_id))
    print(character[0], flush=True)
    if not character[0]:
        raise HTTPException(status_code=404, detail="Character not found or image not linked to character")

    return FileResponse(character[0])

@app.post("/api/my/character/{id}/image", tags=["Character"])
async def set_character_image(id: int, image: UploadFile = File(...), credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    directory = "./server/public/image/characters/"
    if not os.path.exists(directory):
        os.makedirs(directory)

    image_name = "char_" + str(id) + "_" + image.filename

    image_path = os.path.join(directory, image_name)
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    modify_db("UPDATE `characters` SET image = %s WHERE id = %s AND user_id = %s", (image_path, id, user_id))
    return