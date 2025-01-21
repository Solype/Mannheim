from server.server import sio
from server.access_manager import access_manager
from pydantic import BaseModel
from typing import Literal, Optional

@sio.on('message')
async def message(sid, data):
    print("<< message", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)
    # Trouver la room du client (sid)
    rooms = sio.rooms(sid)
    for room in rooms:
        if room != sid:  # Éviter d'envoyer le pong à l'utilisateur lui-même, car il est déjà dans cette room
            await sio.emit('message', data=f"<from {sid}> {data}", to=room)
            print("-- room:", room, flush=True)


@sio.on("join")
async def join(sid, data : str):
    print("<< join", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)
    for room in sio.rooms(sid):
        if room != sid:
            sio.leave_room(sid, room)
    message(sid, "Connected to room: " + data)
    sio.enter_room(sid, data)


class JoinSession(BaseModel):
    name:   str
    token:  str


@sio.on("connect")
async def connect(sid, data: JoinSession):
    print("<< connect", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)
    if access_manager.isTokenValid(data.token):
        sio.enter_room(sid, data.name)
        for room in sio.rooms(sid):
            sio.emit("join", data.name, room=room)
    else:
        sio.disconnect(sid)


@sio.on("disconnect")
async def disconnect(sid):
    print("<< disconnect", flush=True)
    print("-- sid:", sid, flush=True)
    for room in sio.rooms(sid):
        sio.emit("leave", sid, room=room)
        sio.leave_room(sid, room)

class Damage(BaseModel):
    damage:     int
    receiver:   int
    dealer:     int
    monitor:    Literal["Physical", "Mental", "Pathological", "Endurance", "Mana"]
    method:     Optional[str]

@sio.on("damage")
async def damage(sid, data: Damage):
    print("<< damage", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)
    for room in sio.rooms(sid):
        sio.emit("damage", data, room=room)

class Heal(BaseModel):
    heal:       int
    dealer:     int
    receiver:   int

@sio.on("heal")
async def heal(sid, data: Heal):
    print("<< heal", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)
    for room in sio.rooms(sid):
        sio.emit("heal", data, room=room)
