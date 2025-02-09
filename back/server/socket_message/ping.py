from server.server import sio
from server.access_manager import access_manager
from pydantic import BaseModel
from typing import Literal, Optional
from server.mysql_db import getone_db, get_db, modify_db
from server.routes.server_datatype import Pawn, Monitor


class Room(BaseModel):
    id: int
    players: list[str]
    gm_id: Optional[str]

class RoomManager :
    def __init__(self) :
        self.rooms : dict[int, Room] = {}

                        # SID -> Room
        self.players : dict[str, str] = {}

    def joinRoom(self, roomid : int, sid : str, is_gm : bool) :
        if roomid not in self.rooms.keys() :
            self.rooms[roomid] = Room(id=roomid, players=[sid], gm_id=None if not is_gm else sid)
        else :
            self.rooms[roomid].players.append(sid)
            if is_gm :
                self.rooms[roomid].gm_id = sid

        self.players[sid] = roomid
        sio.enter_room(sid, roomid)

    def leaveRoom(self, sid: str):
        if sid in self.players:
            roomid = self.players[sid]

            if roomid in self.rooms:
                room = self.rooms[roomid]
                if sid in room.players:
                    room.players.remove(sid)
                if len(room.players) == 0:
                    del self.rooms[roomid]
                elif room.gm_id == sid:
                    room.gm_id = None
            del self.players[sid]
            sio.leave_room(sid, roomid)
        else:
            print(f"Erreur : le sid {sid} n'est pas trouvé dans les joueurs.")

    def getPlayers(self, roomid : int) :
        return [player.sid for player in self.rooms[roomid].players.values()]
    
    def getGm(self, roomid : int) :
        return self.rooms[roomid].gm_id


room_manager = RoomManager()

class JoinSession(BaseModel):
    session_id: int
    token:      str


@sio.on("join_room")
async def join_room(sid, data: dict):
    print("<< join_room", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)
    try :
        data = JoinSession(**data)
    except Exception as e:
        print(e)
        await sio.disconnect(sid)
        return

    if not access_manager.isTokenValid(data.token):
        await sio.disconnect(sid)

    user = access_manager.getTokenData(data.token)
    if not user:
        await sio.disconnect(sid)
        print("User not found", flush=True)
        return

    print("User found", flush=True)

    result = getone_db("SELECT id FROM session_participants WHERE session_id = %s AND user_id = %s", (data.session_id, user.id))
    if not result:
        await sio.disconnect(sid)
        print("User not in session", flush=True)
        return
    print("User in session", flush=True)

    result = getone_db("SELECT id FROM sessions WHERE id = %s AND gamemaster_id = %s", (data.session_id, user.id,))
    if result:
        print("GM", flush=True)

    room_manager.joinRoom(data.session_id, sid, result != None)
    from time import sleep
    sleep(1)
    await emit_new_pawn(data.session_id, Pawn(id=1, name="test1", chara_id=1, mana=Monitor(max=10, current=5), side=1), "totally")
    await emit_new_pawn(data.session_id, Pawn(id=1, name="test2", chara_id=1, mana=Monitor(max=10, current=5), side=1), "partially")
    await emit_new_pawn(data.session_id, Pawn(id=1, name="test3", chara_id=1, mana=Monitor(max=10, current=5), side=1), None)


@sio.on("disconnect")
async def disconnect(sid):
    print("<< disconnect", flush=True)
    print("-- sid:", sid, flush=True)
    for room in sio.rooms(sid):
        room_manager.leaveRoom(sid)

class MonitorAction(BaseModel):
    damage_phys:    int
    damage_path:    int
    damage_ment:    int
    damage_endu:    int
    damage_mana:    int
    receiver:       int
    dealer:         int
    method:         Optional[str]

@sio.on("damage")
async def damage(sid, data: MonitorAction):
    print("<< damage", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)

    if sid not in room_manager.players.keys():
        return

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

    room = room_manager.players.get(sid)
    sio.emit("damage", data, room=room)

@sio.on("heal")
async def heal(sid, data: MonitorAction):
    print("<< heal", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)

    if sid not in room_manager.players.keys():
        return

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

    room = room_manager.players.get(sid)
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

async def emit_new_pawn(roomid : int, pawn : Pawn, hidden : Literal["totally", "partially", None]) :
    print("emit_new_pawn", roomid, hidden, flush=True)
    if hidden == "totally" :
        gm_id = room_manager.getGm(roomid)
        if gm_id == None :
            return
        await sio.emit("new_pawn", pawn.to_dict(), to=gm_id)
        return
    
    if hidden == None :
        await sio.emit("new_pawn", pawn.to_dict(), room=roomid)
        return

    pawn_copy = pawn.to_dict()
    pawn_copy["pathological"] = None
    pawn_copy["mental"] = None
    pawn_copy["physical"] = None
    pawn_copy["endurance"] = None
    pawn_copy["mana"] = None
    await sio.emit("new_pawn", pawn_copy, room=roomid)
    gm_id = room_manager.getGm(roomid)
    await sio.emit("new_pawn", pawn.to_dict(), to=gm_id)
