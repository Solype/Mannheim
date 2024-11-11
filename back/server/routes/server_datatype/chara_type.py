from pydantic import BaseModel

class CharaBasicInfos(BaseModel):
    name:   str
    race:   str
    age:    str
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

class CharaRoles(BaseModel):
    main:       list[str]
    secondary:  list[str]

class CharaSkill(BaseModel):
    name:       str
    pure:       int
    role:       int
    category:   str

class CharaReligion(BaseModel):
    god:        str
    devotion:   int

class CharaOtherData(BaseModel):
    language:   list[str]
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
