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
    def to_dict(self):
        return {
            "max": self.max,
            "current": self.current
        }

class Pawn(BaseModel):
    id:             int
    name:           str
    chara_id:       Optional[int] = None
    mana :          Optional[Monitor] = None
    physical:       Optional[Monitor] = None
    mental:         Optional[Monitor] = None
    pathological:   Optional[Monitor] = None
    endurance:      Optional[Monitor] = None
    side:           int
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "chara_id": self.chara_id,
            "mana": self.mana.to_dict() if self.mana else None,
            "physical": self.physical.to_dict() if self.physical else None,
            "mental": self.mental.to_dict() if self.mental else None,
            "pathological": self.pathological.to_dict() if self.pathological else None,
            "endurance": self.endurance.to_dict() if self.endurance else None,
            "side": self.side
        }

class PawnSeed(BaseModel):
    linked_id:      int
    hidden:         Literal["totally", "partially", None]
    side:           int


class SessionLong(SessionShort):
    players:    list[Player]
    pawns:      list[Pawn]

class Note(BaseModel):
    id:             int = 0
    is_public:      bool = False
    content:        str

class NoteContent(BaseModel):
    content:           str
