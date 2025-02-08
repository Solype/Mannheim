import React, { useEffect, useState } from 'react';
// import { SessionShort } from '@/types/sesssion_types';
import sessionService from '@/services/SessionService';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { SessionShort, Pawn } from '@/types/sesssion_types';
import LoginService from '@/services/LoginService';



import { SelectCharacter } from '@/components/RoomViewComponent/AddCharacterButton';
import { SelectFriend } from '@/components/RoomViewComponent/AddPlayerButton';


const RoomView: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [room, setRoom] = useState<SessionShort | null>(null);
    const [isGm, setIsGm] = useState<boolean>(false);
    const [GmId, setGmId] = useState<string>("");
    const [pawns, setPawns] = useState<Pawn[]>([]);

    useEffect(() => {
        const loadRoom = async () => {
            if (!id) return;
            try {
                const fetchedRoom = await sessionService.getRoom(id);
                setRoom(fetchedRoom);
                console.log("Room loaded:", fetchedRoom);
                const fetchedPawns = room?.pawns as Pawn[];
                setPawns(fetchedPawns);
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


    return (
        <div className="relative overflow-auto h-full" style={{ backgroundImage: 'url(/bg-rooms.jpg)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <div className="fixed inset-0 bg-black opacity-50 z-10" />

            <div className="relative z-20 mt-14 text-white px-96 flex flex-col gap-20">
                <div className="flex justify-between items-center">
                    {isGm ? (<SelectFriend room_id={room?.id as number} />) : (<SelectCharacter room_id={room?.id as number} />)}
                    <h1 className="text-5xl font-bold text-or stroke-white text-center flex-1 mx-10">
                        Room: {room?.name}
                    </h1>
                    <p className="text-lg text-right mx-10">Game Master: {room?.gm_name}</p>
                </div>
                <p>{room?.description}</p>
            </div>

            <style>{`
                .stroke-white {
                    -webkit-text-stroke: 0.5px black;
                }
            `}</style>
        </div>
    );
};

export default RoomView;
