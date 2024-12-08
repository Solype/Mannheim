from server.server import app, HTTPException
from server.routes.server_datatype import LoreStoryShort, LoreEntityShort, packDbElement, LoreStory
from server.mysql_db import get_db, getone_db

from fastapi.responses import FileResponse
import os



def get_story_linked_to_story(story_id: int) -> list[int]:
    link1 = get_db("SELECT lore_story_id2 FROM `lore_story_link` WHERE lore_story_id1 = %s", (story_id,))
    link2 = get_db("SELECT lore_story_id1 FROM `lore_story_link` WHERE lore_story_id2 = %s", (story_id,))

    return [link[0] for link in link1] + [link[0] for link in link2]


def get_character_linked_to_character(character_id: int) -> list[int]:
    link1 = get_db("SELECT lore_chara_id1 FROM `lore_character_link` WHERE lore_chara_id2 = %s", (character_id,))
    link2 = get_db("SELECT lore_chara_id2 FROM `lore_character_link` WHERE lore_chara_id1 = %s", (character_id,))

    return [link[0] for link in link1] + [link[0] for link in link2]

def get_character_linked_to_story(story_id: int) -> list[int]:
    chara = get_db("SELECT lore_chara_id FROM `lore_character_story_link` WHERE lore_story_id = %s", (story_id,))
    return [chara[0] for chara in chara]

def get_story_linked_to_character(character_id: int) -> list[int]:
    story = get_db("SELECT lore_story_id FROM `lore_character_story_link` WHERE lore_chara_id = %s", (character_id,))
    return [story[0] for story in story]




@app.get("/api/lore/stories", tags=["Lore"])
async def lore_stories() -> list[LoreStoryShort]:
    stories = get_db("SELECT id, title, short_description, image FROM `lore_story`", ())
    return [  packDbElement(LoreStoryShort, story) for story in stories ]

@app.get("/api/lore/entities", tags=["Lore"])
async def lore_entities() -> list[LoreEntityShort]:
    entities = get_db("SELECT id, name, short_description FROM `lore_character`", ())
    return [ packDbElement(LoreEntityShort, entity) for entity in entities ]


@app.get("/api/lore/story/image/{name:str}", tags=["Lore"])
async def lore_story_image(name: str) -> FileResponse:
    return FileResponse(f"./server/public/image/stories/{name}")

@app.get("/api/lore/story/{id}", tags=["Lore"])
async def lore_story(id: int) -> LoreStory:
    story = getone_db("SELECT * FROM `lore_story` WHERE id = %s", (id,))
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")

    content : str

    if story[2] and os.path.exists(story[2]):
        content = open(story[2], "r").read()
    else:
        raise HTTPException(status_code=404, detail="Story image not found")

    related_stories = get_story_linked_to_story(id)
    related_entities = get_character_linked_to_story(id)

    story = dict(zip(["id", "title", "short_description", "image"], story))

    story = LoreStory(
        **{**story, "content": content, "related_stories": related_stories, "related_entities": related_entities}
    )
    return story

@app.get("/api/lore/download", tags=["Lore"])
async def lore() :
    return "Lore"
