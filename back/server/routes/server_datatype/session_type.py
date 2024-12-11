from pydantic import BaseModel
from typing import Optional


class CreateSessionRequest(BaseModel):
    name: str
    description: str


class SessionShort(BaseModel):
    id:             int
    gm_id:          int
    gm_name:        str
    name:           str
    description:    Optional[str]


class Player(BaseModel):
    id:             int
    name:           str


class Monitor(BaseModel):
    current:        int
    max:            int


class Pawn(BaseModel):
    id:             int
    chara_id:       int
    name:           str
    mana :          Monitor
    physical:       Monitor
    mental:         Monitor
    pathological:   Monitor
    endurance:      Monitor


class SessionLong(SessionShort):
    players:    list[Player]
    entities:   list[Pawn]
