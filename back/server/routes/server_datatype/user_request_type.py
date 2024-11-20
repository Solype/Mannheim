from pydantic import BaseModel
from typing import Optional

class UserFriendRequest(BaseModel):
    request_id: int
    requester_id: int
    requester_name: str

class UserSessionRequest(BaseModel):
    request_id: int
    requester_id: int
    requester_name: str
    session_id: int
    session_name: str

class UserCharacterSessionRequest(BaseModel):
    request_id: int
    requester_id: int
    requester_name: str
    session_id: int
    session_name: str
    character_id: int
