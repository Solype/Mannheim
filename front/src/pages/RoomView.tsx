import React, { useEffect, useState } from 'react';
import sessionService from '@/services/SessionService';
import { useParams } from 'react-router-dom';
import { SessionShort, Pawn } from '@/types/sesssion_types';
import LoginService from '@/services/LoginService';



import { SelectCharacter } from '@/components/RoomViewComponent/AddCharacterButton';
import { SelectFriend } from '@/components/RoomViewComponent/AddPlayerButton';
import { Button } from '@/components/ui/button';


const RoomView: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [room, setRoom] = useState<SessionShort | null>(null);
    const [isGm, setIsGm] = useState<boolean>(false);
    const [GmId, setGmId] = useState<string>("");
    const [selectedPawn, setSelectedPawn] = useState<Pawn | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalAction, setModalAction] = useState<'heal' | 'attack' | null>(null);


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

    const handleAction = async (pawn: Pawn) => {
        try {
            if (modalAction === 'heal') {
                console.log(selectedPawn, " Heal ", pawn);
            } else if (modalAction === 'attack') {
                console.log(selectedPawn, " Attack ", pawn);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error handling action:", error);
        }
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
                        <div key={pawn.id} className="flex flex-col bg-white bg-opacity-50 p-4 rounded-lg">
                            <p className='text-black truncate max-width-[100px]'>{pawn.name}</p>
                            <p className='text-black'>Mana: {pawn.mana?.current ?? "?"}  / {pawn?.mana?.max ?? "?"}</p>  
                            <p className='text-black'>Physical: {pawn.physical?.current ?? "?"}  / {pawn.physical?.max ?? "?"}</p>
                            <p className='text-black'>Mental: {pawn.mental?.current ?? "?"}  / {pawn.mental?.max ?? "?"}</p>
                            <p className='text-black'>Pathological: {pawn.pathological?.current ?? "?"}  / {pawn.pathological?.max ?? "?"}</p>
                            <p className='text-black'>Endurance: {pawn.endurance?.current ?? "?"}  / {pawn.endurance?.max ?? "?"}</p>
                            <p className='text-black'>Side: {pawn.side}</p>
                            <div className='flex flex-col gap-4 mt-5'>
                                <Button className="bg-blue-600" onClick={() => reajuste(pawn.id)}>Reajuster</Button>
                                <Button className="bg-green-600" onClick={() => {
                                        setSelectedPawn(pawn);
                                        setModalAction('heal');
                                        setIsModalOpen(true);
                                    }}>Soigner</Button>
                                <Button className="bg-red-600" onClick={() => {
                                        setSelectedPawn(pawn);
                                        setModalAction('attack');
                                        setIsModalOpen(true);
                                    }}>Attaquer</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-30">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">
                            {modalAction === 'heal' ? 'Sélectionnez un pawn à soigner' : 'Sélectionnez un pawn à attaquer'}
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {room?.pawns.map((pawn) => (
                                <button
                                    key={pawn.id}
                                    className="p-4 bg-blue-500 text-white rounded-lg"
                                    onClick={() => handleAction(pawn)}
                                >
                                    {pawn.name}
                                </button>
                            ))}
                        </div>
                        <button
                            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                .stroke-white {
                    -webkit-text-stroke: 0.5px black;
                }
            `}</style>
        </div>
    );
};

export default RoomView;
