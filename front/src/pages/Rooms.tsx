import React, { useEffect, useState } from 'react';
import { SessionShort } from '@/types/sesssion_types';
import sessionService from '@/services/SessionService';

const RoomsPage: React.FC = () => {
    const [rooms, setRooms] = useState<SessionShort[]>([]);
    const [newRoomName, setNewRoomName] = useState<string>("");

    // Fetch sessions on component mount
    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const fetchedRooms = await sessionService.getAllSessions();
            setRooms(fetchedRooms);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    const handleAddRoom = async () => {
        if (!newRoomName.trim()) return;

        try {
            const newRoom = await sessionService.createSession(newRoomName, "");
            setRooms([...rooms, newRoom]);
            setNewRoomName("");
        } catch (error) {
            console.error('Error adding room:', error);
        }
    };

    const handleDeleteRoom = async (roomId: number) => {
        try {
            await sessionService.deleteSession(roomId);
            setRooms(rooms.filter((room) => room.id !== roomId));
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    return (
        <div className="container mx-auto mt-10 px-4">
            <h1 className="text-4xl font-bold text-center">Rooms</h1>
            <p className="text-lg mt-4 text-center">Manage your rooms below</p>

            {/* Add Room Section */}
            <div className="mt-6 flex justify-center">
                <input
                    type="text"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    placeholder="Enter room name"
                    className="border p-2 rounded-md w-1/2 mr-2"
                />
                <button
                    onClick={handleAddRoom}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Room
                </button>
            </div>

            {/* Room List */}
            <div className="mt-8">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div
                            key={room.id}
                            className="flex justify-between items-center border-b py-4 px-4"
                        >
                            <span className="text-lg font-medium">{room.name}</span>
                            <button
                                onClick={() => handleDeleteRoom(room.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No rooms available.</p>
                )}
            </div>
        </div>
    );
};

export default RoomsPage;
