from fastapi import HTTPException
from hashlib import sha256


from server.server import app
from server.db import db
from server.routes.mydatatype import UserRegister

@app.post("/register")
async def register(user: UserRegister):
    username = user.username
    password = sha256(user.password.encode()).hexdigest()

    result = db.get("SELECT * FROM users WHERE username = ?", (username,))
    if result and len(result) > 0:
        print("Username already taken")
        raise HTTPException(status_code=400, detail="Username already taken")

    db.modify("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
    print("Success")
    return "Success", 200