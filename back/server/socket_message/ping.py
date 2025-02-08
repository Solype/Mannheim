from server.server import sio
from server.access_manager import access_manager
from pydantic import BaseModel
from typing import Literal, Optional
from server.mysql_db import getone_db, get_db, modify_db
from server.routes.server_datatype import Pawn



class Player(BaseModel):
    sid: int
    name: str

class Room(BaseModel):
    id: int
    players: dict[int, Player]
    gm_id: Optional[int]

class RoomManager :
    def __init__(self) :
        self.rooms : dict[int, Room] = {}
        self.players : dict[int, int] = {}

    def joinRoom(self, roomid : int, sid : str, name : str, is_gm : bool) :
        if roomid not in self.rooms.keys() :
            self.rooms[roomid] = Room(id=roomid, players={sid : Player(sid=sid, name=name)}, gm_id=None if not is_gm else sid)
        else :
            self.rooms[roomid].players[sid] = Player(sid=sid, name=name)
            if is_gm :
                self.rooms[roomid].gm_id = sid

        self.players[sid] = roomid

    def leaveRoom(self, sid : str) :
        roomid = self.players[sid]
        if roomid in self.rooms.keys() :
            del self.rooms[roomid].players[sid]
            if len(self.rooms[roomid].players) == 0 :
                del self.rooms[roomid]
            elif self.rooms[roomid].gm_id == sid :
                self.rooms[roomid].gm_id = None
        del self.players[sid]

    def getPlayers(self, roomid : int) :
        return [player.sid for player in self.rooms[roomid].players.values()]
    
    def getGm(self, roomid : int) :
        return self.rooms[roomid].gm_id




class JoinSession(BaseModel):
    name:       str
    section_id: int
    token:      str


@sio.on("connect")
async def connect(sid, data: JoinSession):
    print("<< connect", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)
    return
    if not access_manager.isTokenValid(data.token):
        await sio.disconnect(sid)

    user = access_manager.isTokenValid(data.token)
    if not user:
        await sio.disconnect(sid)
        print("User not found", flush=True)
        return

    result = getone_db("SELECT id FROM session_participants WHERE session_id = %s AND user_id = %s", (data.section_id, user.id))
    if not result:
        await sio.disconnect(sid)
        print("User not in session", flush=True)
        return


    result = getone_db("SELECT id FROM sessions WHERE id = %s AND gamemaster_id = %s", (data.section_id, user.id,))
    if result:
        print("GM", flush=True)


    sio.enter_room(sid, data.session_id)
    sio.emit("join", data.name, room=data.session_id)


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

def emit_new_pawn(roomid : int, pawn : Pawn, hidden : Literal["totally", "partially", None]) :
    pass
