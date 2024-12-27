from fastapi import HTTPException
from hashlib import sha256


from server.server import app, HTTPAuthorizationCredentials, security, Depends
from server.access_manager import access_manager
from server.routes.server_datatype import UserLogin
from server.mysql_db import cursor, mydb


@app.post("/login", tags=["Login"])
async def login(user: UserLogin) -> str:
    user.password = sha256(user.password.encode()).hexdigest()

    cursor.execute("SELECT id FROM `users` WHERE username = %s AND password = %s", (user.username, user.password))
    id = cursor.fetchone()
    if not id:
        print("Invalid user:", user.username, user.password)
        raise HTTPException(status_code=401, detail="Invalid credentials")

    tkns_to_rem = []
    for tkn, usr in access_manager.tokens.items() :
        if usr.id == id[0]:
            tkns_to_rem.append(tkn)
    for tkn in tkns_to_rem :
        access_manager.removeToken(tkn)

    token = access_manager.addToken(id[0])

    print(access_manager.tokens, flush=True)
    print(token, flush=True)
    return token

@app.post("/register", tags=["Login"])
async def register(user: UserLogin) -> str:
    user.password = sha256(user.password.encode()).hexdigest()
    cursor.execute("SELECT id FROM `users` WHERE username = %s", (user.username,))
    username = cursor.fetchone()

    if username:
        raise HTTPException(status_code=409, detail="Username already taken")

    try : 
        cursor.execute("INSERT INTO `users` (username, password) VALUES (%s, %s)", (user.username, user.password))
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal server error")

    cursor.execute("SELECT id FROM `users` WHERE username = %s", (user.username,))
    id = cursor.fetchone()
    if not id:
        raise HTTPException(status_code=500, detail="Internal server error")
    mydb.commit()

    token = access_manager.addToken(id[0])
    print(token, flush=True)
    return token


@app.get("/api/whoami", tags=["Login"])
async def whoami(credentials: HTTPAuthorizationCredentials = Depends(security)) -> int:
    token = credentials.credentials    
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    data = access_manager.getTokenData(token)
    return data.id
