import React, { useEffect, useState } from 'react';
// import { SessionShort } from '@/types/sesssion_types';
import sessionService from '@/services/SessionService';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { SessionShort } from '@/types/sesssion_types';
import UserRequestService, { sendRoomInvitation } from '@/services/UserRequestService';
import LoginService from '@/services/LoginService';

const RoomView: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [room, setRoom] = useState<SessionShort | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCharacterOpen, setIsModalCharacterOpen] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [characterName, setCharacterName] = useState("");
    const [isGm, setIsGm] = useState(false);
    const [GmId, setGmId] = useState("");

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
                console.log(userId + " vs " + room.gm_id);

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

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setPlayerName("");
    };

    const openModalCharacter = () => setIsModalCharacterOpen(true);
    const closeModalCharacter = () => {
        setIsModalCharacterOpen(false);
        setCharacterName("");
    };

    const handleSessionInvite = async () => {
        if (playerName.trim() !== "") {
            await UserRequestService.sendRoomInvitation(room?.id as number, playerName as string);
            closeModal();
        } else {
            alert("Veuillez entrer un nom de joueur !");
        }
    };

    const handleCharacterInvite = async () => {
        if (characterName.trim() !== "") {
            await UserRequestService.sendCharacterInvitation(room?.id as number, characterName as string);
            closeModalCharacter();
        } else {
            alert("Veuillez entrer un nom de personnage !");
        }
    };
    return (
        <div className="relative overflow-auto h-full" style={{ backgroundImage: 'url(/bg-rooms.jpg)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <div className="fixed inset-0 bg-black opacity-50 z-10" />

            <div className="relative z-20 mt-14 text-white px-96 flex flex-col gap-20">
                <div className="flex justify-between items-center">
                    {!isGm && (
                        <button onClick={openModalCharacter} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-10">
                            add a character
                        </button>
                    )}
                    {isGm && (
                        <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-10">
                            Invite a player
                        </button>
                    )}
                    <h1 className="text-5xl font-bold text-or stroke-white text-center flex-1 mx-10">
                        Room: {room?.name}
                    </h1>
                    <p className="text-lg text-right mx-10">Game Master: {room?.gm_name}</p>
                </div>
                <p>{room?.description}</p>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold text-white mb-4">Invite a Player</h2>
                        <input 
                            type="text"
                            value={playerName} 
                            onChange={(e) => setPlayerName(e.target.value)} 
                            placeholder="Enter player name" 
                            className="w-full p-2 rounded border-gray-300 mb-4 text-black"
                        />
                        <div className="flex justify-end space-x-4">
                            <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Close
                            </button>
                            <button onClick={handleSessionInvite} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isModalCharacterOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold text-white mb-4">Add a Character</h2>
                        <input 
                            type="text"
                            value={characterName} 
                            onChange={(e) => setCharacterName(e.target.value)} 
                            placeholder="Enter character name" 
                            className="w-full p-2 rounded border-gray-300 mb-4 text-black"
                        />
                        <div className="flex justify-end space-x-4">
                            <button onClick={closeModalCharacter} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Close
                            </button>
                            <button onClick={handleCharacterInvite} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .stroke-white {
                    -webkit-text-stroke: 0.5px black;
                }
            `}</style>
        </div>
    );
};

export default RoomView;
