import json
from pydantic import BaseModel
from typing import List

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
    intellect:      str
    agility:        str
    vivacity:       str
    social:         str

class CharaRoles(BaseModel):
    main:       List[str]
    secondary:  List[str]

class CharaSkill(BaseModel):
    name:       str
    pure:       int
    role:       int
    category:   str

class CharaReligion(BaseModel):
    god:        str
    devotion:   str

class CharaOtherData(BaseModel):
    language:   List[str]
    experience: int
    mana:       int
    money:      int

class CharaAllData(BaseModel):
    infos:          CharaBasicInfos
    priority:       CharaPriority
    attributes:     CharaAttributes
    roles:          CharaRoles
    skills:         List[CharaSkill]
    religion:       List[CharaReligion]
    other:          CharaOtherData

# Exemple d'instance de CharaAllData
character_data = CharaAllData(
    infos=CharaBasicInfos(name="Aragorn", race="Human", age="87", gender="Male"),
    priority=CharaPriority(role="Warrior", attribute="Strength", skills="Combat", money="50"),
    attributes=CharaAttributes(resistance="High", strength="Very High", dexterity="Medium", intellect="Low", agility="Medium", vivacity="High", social="Medium"),
    roles=CharaRoles(main=["Leader"], secondary=["Scout", "Diplomat"]),
    skills=[
        CharaSkill(name="Swordsmanship", pure=90, role=10, category="Combat"),
        CharaSkill(name="Archery", pure=70, role=15, category="Combat")
    ],
    religion=[
        CharaReligion(god="Ilúvatar", devotion="High")
    ],
    other=CharaOtherData(language=["Common", "Elvish"], experience=5000, mana=100, money=50)
)

# Obtenir un dictionnaire puis convertir en JSON avec indentation
json_data = json.dumps(character_data.model_dump(), indent=4)
print(json_data)
