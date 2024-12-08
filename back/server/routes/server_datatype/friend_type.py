from pydantic import BaseModel
from typing import Literal

class Friend(BaseModel):
    id: int
    name: str


class FriendRequest(BaseModel):
    request_id:     int
    sender_id:      int
    sender_name:    str
    receiver_id:    int
    receiver_name:  str
    status:         Literal["pending", "accepted", "refused"]
