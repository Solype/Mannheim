from typing import Optional, Literal
from server.routes.server_datatype.session_type import Pawn, Monitor, PawnSeed
from server.routes.server_datatype.chara_type import CharaAllData
from server.mysql_db import get_db, modify_db
from server.socket_message.ping import emit_new_pawn
import asyncio

def compose_pawn(pawn : tuple, is_gm : bool) -> Optional[Pawn] :
    if (is_gm or pawn[14] == None) :
        return  Pawn(id=pawn[0], name=pawn[1], chara_id=pawn[2],
                        physical=Monitor(current=pawn[3], max=pawn[8]),
                        mental=(Monitor(current=pawn[4], max=pawn[9]) if (pawn[9] != 0) else None),
                        pathological=(Monitor(current=pawn[5], max=pawn[10]) if (pawn[10] != 0) else None),
                        endurance=(Monitor(current=pawn[6], max=pawn[11]) if (pawn[11] != 0) else None),
                        mana=(Monitor(current=pawn[7], max=pawn[12]) if (pawn[12] != 0) else None),
                        side=pawn[13])

    if (pawn[14] == "partially") :
        return Pawn(id=pawn[0], name=pawn[1], chara_id=None, physical= None, mental= None, pathological= None, endurance= None, mana= None, side=pawn[13])

    if (pawn[14] == "totally") :
        return None

def get_pawns_of_session(session_id: int, is_gm : bool) -> list[Pawn]:
    print(is_gm)
    pawns = get_db("""SELECT id, name, character_id,
                   current_physical_health, current_mental_health, current_path_health, current_endurance, current_mana,
                   max_physical_health, max_mental_health, max_path_health, max_endurance, max_mana, side_camp, hidden
                   FROM `entities`
                   WHERE session_id = %s""", (session_id,))

    return [
        result for pawn in pawns
        if (result := compose_pawn(pawn, is_gm)) is not None
    ]



async def insert_pawn_in_db(pawn : Pawn, hidden : Literal["totally", "partially", None], owner_id : int, session_id) :
    sql = """
        INSERT INTO `entities` (
            name, owner_id, session_id,
            current_physical_health, current_path_health, current_mental_health, current_endurance, current_mana,
            max_physical_health, max_mental_health, max_path_health, max_endurance, max_mana,
            character_id, side_camp, hidden
        ) VALUES (
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
        )
        """
    print("inserted pawn", pawn, flush=True)
    params = ( pawn.name, owner_id, session_id,
        pawn.physical.current, pawn.pathological.current, pawn.mental.current, pawn.endurance.current, pawn.mana.current,
        pawn.physical.max, pawn.mental.max, pawn.pathological.max, pawn.endurance.max, pawn.mana.max,
        pawn.chara_id, pawn.side, hidden)
    success = modify_db(sql, params)

    if success != None :
        pawn.id = success
        await emit_new_pawn(session_id, pawn, hidden)
    return success


def transform_chara_into_pawn(chara: CharaAllData, seed : PawnSeed) -> Pawn:

    dictio = {}
    for skill in chara.skills :
        if skill.category == "resistance" :
            dictio[skill.name] = chara.attributes.resistance + skill.pureValue + skill.roleValue

    mana_monitor = Monitor(max=chara.other.mana, current=chara.other.mana) if chara.other != None else None
    physical_monitor = Monitor(max=dictio["physical"], current=dictio["physical"]) if "physical" in dictio.keys() else None
    mental_monitor = Monitor(max=dictio["mental"], current=dictio["mental"]) if "mental" in dictio.keys() else None
    pathological_monitor = Monitor(max=dictio["pathological"], current=dictio["pathological"]) if "pathological" in dictio.keys() else None
    endurance_monitor = Monitor(max=dictio["endurance"], current=dictio["endurance"]) if "endurance" in dictio.keys() else None

    return Pawn(
        id = 0,
        chara_id = seed.linked_id,
        name = chara.infos.name,
        mana = mana_monitor,
        physical = physical_monitor,
        mental = mental_monitor,
        pathological = pathological_monitor,
        endurance = endurance_monitor,
        side = seed.side
    )
