from pydantic import BaseModel
from typing import Optional

class LoreStoryShort(BaseModel):
    id: int
    title: str
    short_description: str

class LoreStory(BaseModel):
    id: int
    title: str
    short_description: str
    content: str
    related_stories: list[int]
    related_entities: list[int]

class LoreEntityShort(BaseModel):
    id: int
    name: str
    short_description: str

class LoreEntity(BaseModel):
    id: int
    name: str
    short_description: str
    content: str
    related_stories: Optional[list[int]]
    related_entities: Optional[list[int]]
