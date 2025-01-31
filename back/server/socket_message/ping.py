from server.server import sio
from server.access_manager import access_manager
from pydantic import BaseModel
from typing import Literal, Optional
from server.mysql_db import getone_db, get_db, modify_db

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
    name:       str
    seccion_id: int
    token:      str


@sio.on("connect")
async def connect(sid, data: JoinSession):
    print("<< connect", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)
    user = access_manager.isTokenValid(data.token)
    if not user:
        sio.disconnect(sid)

    result = getone_db("SELECT id FROM session_participants WHERE session_id = %s AND user_id = %s", (data.seccion_id, user.id))
    if not result:
        sio.disconnect(sid)

    sio.enter_room(sid, data.session_id)
    for room in sio.rooms(sid):
        sio.emit("join", data.name, room=room)


@sio.on("disconnect")
async def disconnect(sid):
    print("<< disconnect", flush=True)
    print("-- sid:", sid, flush=True)
    for room in sio.rooms(sid):
        sio.emit("leave", sid, room=room)
        sio.leave_room(sid, room)

class MonitorAction(BaseModel):
    damage_phys:    int
    damage_path:    int
    damage_ment:    int
    damage_endu:    int
    receiver:       int
    dealer:         int
    method:         Optional[str]

@sio.on("damage")
async def damage(sid, data: MonitorAction):
    print("<< damage", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)

    pawn = getone_db("SELECT id FROM entities WHERE id = %s", (data.receiver,))
    if not pawn:
        return

    if (data.damage_endu > 0) :
        modify_db("UPDATE entities SET current_endurance = current_endurance - %s WHERE id = %s", (data.damage_endu, data.receiver))
    if (data.damage_ment > 0) :
        modify_db("UPDATE entities SET current_mental = current_mental - %s WHERE id = %s", (data.damage_ment, data.receiver))
    if (data.damage_path > 0) :
        modify_db("UPDATE entities SET current_path = current_path - %s WHERE id = %s", (data.damage_path, data.receiver))
    if (data.damage_phys > 0) :
        modify_db("UPDATE entities SET current_physical = current_physical - %s WHERE id = %s", (data.damage_phys, data.receiver))

    for room in sio.rooms(sid):
        sio.emit("damage", data, room=room)

@sio.on("heal")
async def heal(sid, data: MonitorAction):
    print("<< heal", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)


    pawn = getone_db("SELECT id FROM entities WHERE id = %s", (data.receiver,))
    if not pawn:
        return

    if (data.damage_endu > 0) :
        modify_db("UPDATE entities SET current_endurance = current_endurance + %s WHERE id = %s", (data.damage_endu, data.receiver))
    if (data.damage_ment > 0) :
        modify_db("UPDATE entities SET current_mental = current_mental + %s WHERE id = %s", (data.damage_ment, data.receiver))
    if (data.damage_path > 0) :
        modify_db("UPDATE entities SET current_path = current_path + %s WHERE id = %s", (data.damage_path, data.receiver))
    if (data.damage_phys > 0) :
        modify_db("UPDATE entities SET current_physical = current_physical + %s WHERE id = %s", (data.damage_phys, data.receiver))

    for room in sio.rooms(sid):
        sio.emit("heal", data, room=room)


class Focus(BaseModel):
    player_id:  int
    pawn_id:    int

@sio.on("focus")
async def focus(sid, data):
    print("<< focus", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)
    for room in sio.rooms(sid):
        sio.emit("focus", data, room=room)
