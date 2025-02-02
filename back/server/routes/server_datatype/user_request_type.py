from pydantic import BaseModel
from typing import Literal

class UserSessionRequestCreate(BaseModel):
    session_id:         int
    receiver_id:        int


class UserSessionRequest(BaseModel):
    request_id:         int # done
    gm_id:              int # done
    gm_name:            str # done
    session_id:         int # done
    session_name:       str # done
    receiver_id:        int # done
    receiver_name:      str
    status:             Literal["pending", "accepted", "refused"]


class UserPawnRequestCreate(BaseModel):
    session_id:         int
    character_id:       int

class UserPawnRequest(BaseModel):
    request_id:         int
    sender_id:          int
    sender_name:        str
    session_id:         int
    session_name:       str
    character_id:       int
    character_name:     str
    receiver_id:        int
    receiver_name:      str
    status:             Literal["pending", "accepted", "refused"]
