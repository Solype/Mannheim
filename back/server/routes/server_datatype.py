from pydantic import BaseModel

class LoreStoryShort(BaseModel):
    name: str
    

class UserLogin(BaseModel):
    username: str
    password: str

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
    resistance:     str
    strength:       str
    dexterity:      str
    intelligence:   str
    agility:        str
    vivacity:       str
    social:         str

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
    devotion:   str

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
    religion:       CharaReligion
    other:          CharaOtherData
