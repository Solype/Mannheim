from pydantic import BaseModel

class LoreStoryShort(BaseModel):
    name: str
    

class UserLogin(BaseModel):
    username: str
    password: str
