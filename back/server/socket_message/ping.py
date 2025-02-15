from server.server import sio
from server.access_manager import access_manager
from pydantic import BaseModel
from typing import Literal, Optional
from server.mysql_db import getone_db, modify_db
from server.routes.server_datatype import Pawn, Note


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
    method:         Optional[str] = None

@sio.on("attack")
async def damage(sid, data: MonitorAction):
    print("<< damage", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)

    if sid not in room_manager.players.keys():
        return

    data_obj = MonitorAction(**data)
    print(data_obj, flush=True)
    print(data_obj.damage_phys, data_obj.damage_phys > 0, flush=True)
    pawn = getone_db("SELECT id, current_physical_health, current_mental_health, current_path_health, current_endurance, current_mana FROM entities WHERE id = %s", (data_obj.receiver,))
    if not pawn:
        print("pawn not found", flush=True)
        return

    pawn = list(pawn)
    print("pawn : ", pawn, flush=True)
    if (pawn[1] != None and data_obj.damage_phys > 0) :
        pawn[1] -= data_obj.damage_phys
    if (pawn[2] != None and data_obj.damage_ment > 0) :
        pawn[2] -= data_obj.damage_ment
    if (pawn[3] != None and data_obj.damage_path > 0) :
        pawn[3] -= data_obj.damage_path
    if (pawn[4] != None and data_obj.damage_endu > 0) :
        pawn[4] -= data_obj.damage_endu
    if (pawn[5] != None and data_obj.damage_mana > 0) :
        pawn[5] -= data_obj.damage_mana
    
    modify_db("UPDATE entities SET current_physical_health = %s, current_mental_health = %s, current_path_health = %s, current_endurance = %s, current_mana = %s WHERE id = %s", 
        (pawn[1], pawn[2], pawn[3], pawn[4], pawn[5], pawn[0]))

    room = room_manager.players.get(sid)
    await sio.emit("attack", data, room=room)

@sio.on("heal")
async def heal(sid, data: MonitorAction):
    print("<< heal", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)

    if sid not in room_manager.players.keys():
        return

    data_obj = MonitorAction(**data)
    print(data_obj, flush=True)
    print(data_obj.damage_phys, data_obj.damage_phys > 0, flush=True)
    pawn = getone_db("SELECT id, current_physical_health, current_mental_health, current_path_health, current_endurance, current_mana FROM entities WHERE id = %s", (data_obj.receiver,))
    if not pawn:
        print("pawn not found", flush=True)
        return

    pawn = list(pawn)
    print("pawn : ", pawn, flush=True)
    if (pawn[1] != None and data_obj.damage_phys > 0) :
        pawn[1] += data_obj.damage_phys
    if (pawn[2] != None and data_obj.damage_ment > 0) :
        pawn[2] += data_obj.damage_ment
    if (pawn[3] != None and data_obj.damage_path > 0) :
        pawn[3] += data_obj.damage_path
    if (pawn[4] != None and data_obj.damage_endu > 0) :
        pawn[4] += data_obj.damage_endu
    if (pawn[5] != None and data_obj.damage_mana > 0) :
        pawn[5] += data_obj.damage_mana
    
    modify_db("UPDATE entities SET current_physical_health = %s, current_mental_health = %s, current_path_health = %s, current_endurance = %s, current_mana = %s WHERE id = %s", 
        (pawn[1], pawn[2], pawn[3], pawn[4], pawn[5], pawn[0]))

    room = room_manager.players.get(sid)
    await sio.emit("heal", data, room=room)


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

async def emit_note(roomid : int, note : Note) :
    print("emit_note", roomid, flush=True)
    if note.is_public :
        await sio.emit("note", note.__dict__, room=roomid)
    else :
        gm_id = room_manager.getGm(roomid)
        if gm_id == None :
            return
        await sio.emit("note", note.__dict__, to=gm_id)

async def emit_delete_pawn(roomid : int, id : int) :
    print("emit_delete_pawn", roomid, flush=True)
    await sio.emit("delete_pawn", id, room=roomid)

async def emit_delete_note(roomid : int, id : int) :
    print("emit_delete_note", roomid, flush=True)
    await sio.emit("delete_note", id, room=roomid)