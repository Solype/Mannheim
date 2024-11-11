from server.server import app
from server.routes.server_datatype import LoreStoryShort, LoreEntityShort, BaseModel
from server.mysql_db import get_db

def packDbElement(classElement : BaseModel, tupleElement : tuple) :
    return classElement(**zip(classElement.model_fields.keys(), tupleElement))

@app.get("/api/lore/stories")
async def lore_stories() -> list[LoreStoryShort]:
    stories = get_db("SELECT id, title, short_description, image FROM `lore_story`", ())
    return [  packDbElement(LoreStoryShort, story) for story in stories ]

@app.get("/api/lore/entities")
async def lore_entities() -> list[LoreEntityShort]:
    entities = get_db("SELECT id, name, short_description, image FROM `lore_entity`", ())
    return [ packDbElement(LoreEntityShort, entity) for entity in entities ]

@app.get("/api/lore/download")
async def lore() :
    return "Lore"
