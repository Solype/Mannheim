import React from 'react';
import SocketComponent from '@/components/PoNg';

const RoomsPage: React.FC = () => {
    return (
        <div className="text-center mt-5">
            <h1 className="text-4xl font-bold">Rooms</h1>
            <p className="text-lg mt-4">Welcome to the Rooms!</p>
            <SocketComponent />
        </div>
    );
};

export default RoomsPage;
