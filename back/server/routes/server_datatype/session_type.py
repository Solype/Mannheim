from pydantic import BaseModel
from typing import Optional, Literal


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
    mana :          Optional[Monitor]
    physical:       Optional[Monitor]
    mental:         Optional[Monitor]
    pathological:   Optional[Monitor]
    endurance:      Optional[Monitor]
    side:           int

class PawnSeed(BaseModel):
    linked_id:      int
    hidden:         Literal["totally", "partially", None]
    side:           int


class SessionLong(SessionShort):
    players:    list[Player]
    entities:   list[Pawn]
