from pydantic import BaseModel
from typing import Optional

class CharaBasicInfos(BaseModel):
    name:   str
    race:   Optional[str] = None
    age:    Optional[int] = None
    gender: Optional[str] = None

class CharaPriority(BaseModel):
    role:       str
    attribute:  str
    skills:     str
    money:      str

class CharaAttributes(BaseModel):
    resistance:     int
    strength:       int
    dexterity:      int
    vivacity:       int
    intellect:      Optional[int] = None
    agility:        Optional[int] = None
    social:         Optional[int] = None
    magic:          Optional[int] = None

class CharaRoles(BaseModel):
    main:       list[str] = []
    secondary:  list[str] = []

class CharaSkill(BaseModel):
    name:           str
    pureValue:      int
    roleValue:      int
    category:       str

class CharaReligion(BaseModel):
    god:        str
    devotion:   int

class CharaOtherData(BaseModel):
    languages:   list[str]
    experience: int
    mana:       int
    money:      int

class CharaAllData(BaseModel):
    infos:          CharaBasicInfos
    attributes:     CharaAttributes
    skills:         list[CharaSkill] = []
    religion:       list[CharaReligion] = []
    priority:       Optional[CharaPriority] = None
    roles:          Optional[CharaRoles] = None
    other:          Optional[CharaOtherData] = None

class CharaAllDataShort(BaseModel):
    infos:          CharaBasicInfos
    roles:          CharaRoles

class CharaAllDataWithId(CharaAllData):
    id:             int

class CharaAllDataWithIdShort(CharaAllDataShort):
    id:             int
