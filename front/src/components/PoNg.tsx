import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:8080'; // Remplacez par l'URL de votre serveur

const SocketComponent = () => {
    const [text, setText] = useState('');
    const [socket, setSocket] = useState<any>(null);

    // Créer une seule instance de socket lors du montage du composant
    useEffect(() => {
        const socketInstance = io(SOCKET_SERVER_URL, {
            transports: ['websocket'],
        });

        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('Connected to server with ID:', socketInstance.id);
        });

        socketInstance.onAny((event, data) => {
            console.log(`Événement reçu: ${event}`, data);  // Affiche l'événement et les données reçues
        });

        // Cleanup lors du démontage du composant
        return () => {
            socketInstance.disconnect();
        };
    }, []); // Le tableau vide signifie que cet effet ne sera exécuté qu'une seule fois lors du montage du composant

    const message = () => {
        if (socket) {
            socket.emit('ping');
            console.log('Sent ping to server');
        }
    };

    const global_message = () => {
        if (socket) {
            socket.emit('gping');
            console.log('Sent global ping to server');
        }
    };

    const room_message = () => {
        if (socket) {
            socket.emit('rping');
            console.log('Sent room ping to server');
        }
    };

    const join_room = () => {
        if (socket) {
            socket.emit('join', text);
            console.log('Joined room:', text);
        }
    };

    return (
        <div>
            <h1>Socket.IO React Example</h1>
            <div className='flex gap-2 justify-center'>
                <button className='border' onClick={message}>Send private</button>
                <button className='border' onClick={global_message}>Send global</button>
                <button className='border' onClick={room_message}>Send room</button>
            </div>
            <br />
            <div className='flex gap-2 justify-center'>
                <input
                    className='border-2 border-black'
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)} 
                />
                <button onClick={join_room}>Join Room</button>
            </div>
            <br />
        </div>
    );
};

export default SocketComponent;
