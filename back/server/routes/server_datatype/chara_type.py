from pydantic import BaseModel

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
    strength:       int
    dexterity:      int
    intellect:      int
    agility:        int
    vivacity:       int
    social:         int
    magic:          int

class CharaRoles(BaseModel):
    main:       list[str]
    secondary:  list[str]

class CharaSkill(BaseModel):
    name:       str
    pureValue:       int
    roleValue:       int
    category:   str

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
    priority:       CharaPriority
    attributes:     CharaAttributes
    roles:          CharaRoles
    skills:         list[CharaSkill]
    religion:       list[CharaReligion]
    other:          CharaOtherData

class CharaAllDataShort(BaseModel):
    infos:          CharaBasicInfos
    roles:          CharaRoles

class CharaAllDataWithId(CharaAllData):
    id:             int

class CharaAllDataWithIdShort(CharaAllDataShort):
    id:             int
