import React, { useEffect, useState } from 'react';
// import { SessionShort } from '@/types/sesssion_types';
import sessionService from '@/services/SessionService';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { SessionShort } from '@/types/sesssion_types';

const RoomView: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [room, setRoom] = useState<SessionShort | null>(null);

    useEffect(() => {
        loadRoom();
    }, []);

    const loadRoom = async () => {
        try {
            if (!id) { return; }
            sessionService.getRoom(id).then((room) => {
                setRoom(room);
            });
            // console.log(room);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    // const handleAddRoom = async () => {
    //     if (!newRoomName.trim()) return;

    //     try {
    //         const newRoom = await sessionService.createSession(newRoomName, "");
    //         setRooms([...rooms, newRoom]);
    //         setNewRoomName("");
    //     } catch (error) {
    //         console.error('Error adding room:', error);
    //     }
    // };

    // const handleDeleteRoom = async (roomId: number) => {
    //     try {
    //         await sessionService.deleteSession(roomId);
    //         setRooms(rooms.filter((room) => room.id !== roomId));
    //     } catch (error) {
    //         console.error('Error deleting room:', error);
    //     }
    // };

    return (
        <div className="relative overflow-auto h-full" style={{ backgroundImage: 'url(/bg-rooms.jpg)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <div className="fixed inset-0 bg-black opacity-50 z-10" />

            <div className="relative z-20 mt-14 text-white px-96 flex flex-col gap-20">
                <div>
                    <h1 className="text-5xl font-bold text-center text-or stroke-white ">Room: {room?.name}</h1>
                    <p>{room?.description}</p>
                    {/* <p className="text-lg mt-4 text-center">Gérer vos rooms ci-dessous</p> */}
                </div>

                {/* <div className="mt-6 flex justify-center">
                    <Input
                        type="text"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        placeholder="Entrez le nom de la room"
                        className="border rounded-md mr-2 bg-white bg-opacity-80 py-5 text-black"
                    />
                    <Button
                        onClick={handleAddRoom}
                        className="bg-foret text-xl text-white w-1/3 p-5 rounded-md hover:bg-light_foret hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] transition-all duration-300"
                    >
                        Créer
                    </Button>
                </div> */}

                {/* <div className="mt-8 bg-black rounded-md bg-opacity-70 ">
                    {rooms.length > 0 ? (
                        rooms.map((room) => (
                            <div
                                key={room.id}
                                className="flex justify-between items-center border-b p-4 hover:bg-white/10 hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] transition-all duration-300 rounded-t-md"
                            >
                                <span className="text-lg font-medium">{room.name} - {room.gm_name}</span>
                                <button
                                    onClick={() => handleDeleteRoom(room.id)}
                                    className="bg-red-500/80 text-white p-2 rounded-md hover:bg-red-800"
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className='opacity-80 flex flex-col gap-10'>
                            <img src="/door.png" alt="No rooms" className="mx-auto w-64" />
                            <p className="text-center text-2xl">No rooms available.</p>
                        </div>
                    )}
                </div> */}
            </div>
            <style jsx>{`
                .stroke-white {
                    -webkit-text-stroke: 0.5px black;
                }
            `}</style>
        </div>

    );
};

export default RoomView;
