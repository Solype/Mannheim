import React, { useEffect, useRef, useState } from 'react';
import sessionService from '@/services/SessionService';
import { useParams } from 'react-router-dom';
import { SessionShort, Pawn } from '@/types/sesssion_types';
import LoginService from '@/services/LoginService';



import { SelectCharacter } from '@/components/RoomViewComponent/AddCharacterButton';
import { SelectFriend } from '@/components/RoomViewComponent/AddPlayerButton';
import EntityCard from '@/components/RoomViewComponent/EntityCard';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SocketService from '@/services/SocketService';


interface MonitorAction {
    damage_phys: number;
    damage_path: number;
    damage_ment: number;
    damage_endu: number;
    damage_mana: number;
    receiver?: number;
    dealer?: number;
    method?: string;
}


const RoomView: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [room, setRoom] = useState<SessionShort | null>(null);
    const [isGm, setIsGm] = useState<boolean>(false);
    const [_, setGmId] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalAction, setModalAction] = useState<'heal' | 'attack' | null>(null);
    const [ monitorAction, setMonitorAction ] = useState<MonitorAction | null>(null);

    const [ socket, setSocket ] = useState<SocketService | null>(null);

    useEffect(() => {
        console.log("Room ID:", id);
        const socket = new SocketService();
        setSocket(socket);
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket || !room) return;
        console.log("Joining room, 1st test:", room.id);
        if (room.id != socket.getCurrentRoom()) {
            console.log("Joining room:", room.id);
            socket.joinRoom(room.id);
        }
    }, [socket, room]);

    const setSelectedPawn = (pawn: Pawn) => {
        setMonitorAction((prev) => {
            if (prev === null) return {
                damage_phys: 0,
                damage_path: 0,
                damage_ment: 0,
                damage_endu: 0,
                damage_mana: 0,
                receiver: undefined,
                dealer: pawn.id,
                method: undefined
            }
            return {...prev, dealer: pawn.id}
        });
    }

    const setTargetPawn = (pawn: Pawn) => {
        setMonitorAction((prev) => {
            if (prev === null) return {
                damage_phys: 0,
                damage_path: 0,
                damage_ment: 0,
                damage_endu: 0,
                damage_mana: 0,
                receiver: pawn.id,
                dealer: undefined,
                method: undefined
            }
            return {...prev, receiver: pawn.id}
        });
    }

    useEffect(() => {
        const loadRoom = async () => {
            if (!id) return;
            try {
                const fetchedRoom = await sessionService.getRoom(id);
                setRoom(fetchedRoom);
                console.log("Room loaded:", fetchedRoom);
            } catch (error) {
                console.error("Error fetching room:", error);
            }
        };
        
        loadRoom();
    }, [id]);
    
    useEffect(() => {
        if (!room) return;
        
        const checkGm = async () => {
            try {
                const userId = await LoginService.whoami();
                
                if (userId) {
                    setGmId(userId);
                    setIsGm(Number(userId) === room.gm_id);
                }
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };
        
        checkGm();
    }, [room]);

    const reajuste = async (id: number) => {
        try {
            console.log("Reajuste:", id);
        } catch (error) {
            console.error("Error reajuste:", error);
        }
    };

    const handleSelectTarget = async (pawn: Pawn) => {
        try {
            setTargetPawn(pawn);
        } catch (error) {
            console.error("Error handling action:", error);
        }
    };

    const handleAction = async () => {
        try {
            console.log("Action:", modalAction, monitorAction);
        } catch (error) {
            console.error("Error handling action:", error);
        }
        setIsModalOpen(false);
        setMonitorAction(null);
    };

    return (
        <div className="relative overflow-auto h-full" style={{ backgroundImage: 'url(/bg-rooms.jpg)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <div className="fixed inset-0 bg-black opacity-50 z-10" />

            <div className="relative z-20 mt-14 text-white px-32 flex flex-col gap-20">
                <div className="flex justify-between items-center">
                    {isGm ? (<SelectFriend room_id={room?.id as number} />) : (<SelectCharacter room_id={room?.id as number} />)}
                    <h1 className="text-5xl font-bold text-or stroke-white text-center flex-1 mx-10">
                        Room: {room?.name}
                    </h1>
                    <p className="text-lg text-right mx-10">Game Master: {room?.gm_name}</p>
                </div>
                <p>{room?.description}</p>
                <div className="grid grid-cols-5 gap-4">
                    {room?.pawns && room?.pawns.map((pawn) => (
                        <EntityCard key={pawn.id} pawn={pawn} setModalAction={setModalAction} setSelectedPawn={setSelectedPawn} setIsModalOpen={setIsModalOpen} reajuste={reajuste} />
                    ))}
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={(param) => {setIsModalOpen(param); setMonitorAction(null);}}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{modalAction === 'heal' ? 'Sélectionnez un pion à soigner' : 'Sélectionnez un pion à attaquer'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        {room?.pawns.map((pawn) => (
                            <Button
                                key={pawn.id}
                                className="p-4 bg-blue-500 text-white rounded-lg"
                                onClick={() => handleSelectTarget(pawn)}
                            >
                                {pawn.name}
                            </Button>
                        ))}
                    </div>
                    <div>
                        {monitorAction?.receiver && (
                            <>
                                <EntityCard key={monitorAction.receiver} pawn={room?.pawns.find((pawn) => pawn.id === monitorAction.receiver)!}/>
                                <div className="space-y-2 mt-4">
                                    <Label>Physical Damage</Label>
                                    <Input type="number" value={monitorAction.damage_phys} onChange={(e) => setMonitorAction({...monitorAction, damage_phys: Number(e.target.value)})} />
                                    <Label>Pathological Damage</Label>
                                    <Input type="number" value={monitorAction.damage_path} onChange={(e) => setMonitorAction({...monitorAction, damage_path: Number(e.target.value)})} />
                                    <Label>Mental Damage</Label>
                                    <Input type="number" value={monitorAction.damage_ment} onChange={(e) => setMonitorAction({...monitorAction, damage_ment: Number(e.target.value)})} />
                                    <Label>Endurance Damage</Label>
                                    <Input type="number" value={monitorAction.damage_endu} onChange={(e) => setMonitorAction({...monitorAction, damage_endu: Number(e.target.value)})} />
                                </div>
                            </>
                        )}
                    </div>
                    <DialogFooter>
                        { monitorAction && monitorAction.receiver && <Button onClick={handleAction}>Confirmer</Button>}
                        <Button onClick={() => {setIsModalOpen(false); setMonitorAction(null);}}>Annuler</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <style>{`
                .stroke-white {
                    -webkit-text-stroke: 0.5px black;
                }
            `}</style>
        </div>
    );
};

export default RoomView;
