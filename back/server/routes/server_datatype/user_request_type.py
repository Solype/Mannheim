from pydantic import BaseModel
from typing import Literal

class UserSessionRequest(BaseModel):
    request_id: int
    requester_id: int
    requester_name: str
    session_id: int
    session_name: str
    status: Literal["pending", "accepted", "refused"]

class UserCharacterSessionRequest(BaseModel):
    request_id: int
    requester_id: int
    requester_name: str
    session_id: int
    session_name: str
    character_id: int
    status: Literal["pending", "accepted", "refused"]
