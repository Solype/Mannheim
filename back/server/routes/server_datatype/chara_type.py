from pydantic import BaseModel
from typing import Optional

class CharaBasicInfos(BaseModel):
    name:   str
    race:   str
    age:    int
    gender: str

class CharaPriority(BaseModel):
    role:       str
    attribute:  str
    skills:     str
    money:      str

class CharaAttributes(BaseModel):
    resistance:     int
    strength:       Optional[int]
    dexterity:      Optional[int]
    intellect:      Optional[int]
    agility:        Optional[int]
    vivacity:       Optional[int]
    social:         Optional[int]
    magic:          Optional[int]

class CharaRoles(BaseModel):
    main:       list[str]
    secondary:  list[str]

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
    priority:       Optional[CharaPriority]
    attributes:     CharaAttributes
    roles:          Optional[CharaRoles]
    skills:         list[CharaSkill]
    religion:       Optional[list[CharaReligion]]
    other:          Optional[CharaOtherData]

class CharaAllDataShort(BaseModel):
    infos:          CharaBasicInfos
    roles:          CharaRoles

class CharaAllDataWithId(CharaAllData):
    id:             int

class CharaAllDataWithIdShort(CharaAllDataShort):
    id:             int
