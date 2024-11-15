import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:8080';

const SocketComponent = () => {
    const [ text, setText ] = useState('');
    const [ currentRoom, setCurrentRoom ] = useState('');
    const [ inputRoom, setInputRoom ] = useState('');
    const [ socket, setSocket ] = useState<any>(null);
    const [ messages, setMessages ] = useState<string[]>([]);

    useEffect(() => {
        const socketInstance = io(SOCKET_SERVER_URL, {
            transports: ['websocket'],
        });

        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('Connected to server with ID:', socketInstance.id);
        });

        socketInstance.on("message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);


    const join_room = () => {
        if (socket) {
            socket.emit('join', inputRoom);
            setCurrentRoom(inputRoom);
            setMessages([]);
        }
    };

    const send_message = () => {
        if (socket) {
            socket.emit('message', text);
        }
    };

    return (
        <div>
            <h1>Socket.IO React Example</h1>
            <br />
            <div className='flex gap-2 justify-center'>
                <input
                    className= { inputRoom !== currentRoom ? 'border-2 border-red-500' : 'border-2 border-black'}
                    type="text"
                    value={inputRoom}
                    onChange={(e) => setInputRoom(e.target.value)} 
                />
                <button onClick={join_room}>Join Room</button>
            </div>
            <br />
            <div className='flex gap-2 justify-center'>
                <input
                    className="border-2 border-black"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)} 
                />
                <button onClick={send_message}>send message</button>
                <br />
            </div>
            <div>
                <p>messages : </p>{messages.map((message) => <p>{message}</p>)}
            </div>
        </div>
    );
};

export default SocketComponent;
