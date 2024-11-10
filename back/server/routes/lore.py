from server.server import app
from server.routes.server_datatype import LoreStoryShort

@app.get("/api/lore/global")
async def lore() -> list[LoreStoryShort]:
    return "Lore"
