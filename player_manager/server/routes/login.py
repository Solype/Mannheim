from fastapi import HTTPException
from hashlib import sha256


from server.server import app
from server.db import db
from server.access_manager import access_manager
from server.routes.mydatatype import UserRegister


@app.post('/login')
def login(user: UserRegister):
    username = user.username
    password = sha256(user.password.encode()).hexdigest()

    result = db.get("SELECT id FROM users WHERE username = ? AND password = ?", (username, password))
    if not result or len(result) == 0:
        print("Wrong username or password")
        raise HTTPException(status_code=400, detail="Wrong username or password")
    token = access_manager.addToken(result[0][0])
    print("Login success")
    return {"content": token}, 200
