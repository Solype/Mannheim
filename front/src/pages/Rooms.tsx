import React, { useEffect, useState } from 'react';
import { SessionShort } from '@/types/sesssion_types';
import sessionService from '@/services/SessionService';
// import SocketComponent from '@/components/SocketComponent'

const RoomsPage: React.FC = () => {
    const [ rooms, setRooms ] = useState<SessionShort[]>([]);

    useEffect(() => {
        sessionService.getAllSessions().then((rooms) => setRooms(rooms)).catch(
            (error) => {
                console.error('Error fetching rooms:', error);
            }
        );
    }, []);

    return (
        <div className="text-center mt-5">
            <h1 className="text-4xl font-bold">Rooms</h1>
            <p className="text-lg mt-4">Welcome to the Rooms!</p>
            {/* <SocketComponent /> */}
            {rooms.map((room) => (
                <div key={room.id}>
                    <p>{room.name}</p>
                </div>
            ))}
        </div>
    );
};

export default RoomsPage;
