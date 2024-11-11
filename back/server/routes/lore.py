from server.server import app, HTTPException
from server.routes.server_datatype import LoreStoryShort, LoreEntityShort, packDbElement, LoreStory
from server.mysql_db import get_db, getone_db

import os

@app.get("/api/lore/stories", tags=["Lore"])
async def lore_stories() -> list[LoreStoryShort]:
    stories = get_db("SELECT id, title, short_description, image FROM `lore_story`", ())
    return [  packDbElement(LoreStoryShort, story) for story in stories ]

@app.get("/api/lore/entities", tags=["Lore"])
async def lore_entities() -> list[LoreEntityShort]:
    entities = get_db("SELECT id, name, short_description, image FROM `lore_entity`", ())
    return [ packDbElement(LoreEntityShort, entity) for entity in entities ]


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

    related_stories = get_db(
        """
        SELECT id FROM `lore_story` 
        WHERE id IN (
            SELECT lore_id2 FROM `lore_story_link` WHERE lore_id1 = %s
            UNION
            SELECT lore_id1 FROM `lore_story_link` WHERE lore_id2 = %s
        )
        """,
        (id, id)
    )

    related_stories = [story[0] for story in related_stories]

    related_entities = get_db(
        """
        SELECT id FROM `lore_entity` 
        WHERE id IN (
            SELECT entity_id FROM `lore_entity_link` WHERE story_id = %s
        )
        """,
        (id,)
    )

    related_entities = [entity[0] for entity in related_entities]

    story = dict(zip(["id", "title", "short_description", "image"], story))

    story = LoreStory(
        **{**story, "content": content, "related_stories": related_stories, "related_entities": related_entities}
    )
    return story

@app.get("/api/lore/download", tags=["Lore"])
async def lore() :
    return "Lore"
