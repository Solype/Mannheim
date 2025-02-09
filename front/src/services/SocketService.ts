import { io, Socket } from "socket.io-client";


class SocketService {
    private socket: Socket;
    private baseUrl : string;
    private currentRoom ?: number;

    constructor() {
        this.baseUrl = __DOCKER_HOST_IP__ ? `ws://${__DOCKER_HOST_IP__}:8080` : `ws://${__MY_LOCAL_IP__}:8080`;

        this.socket = io(this.baseUrl, {
            transports: ["websocket"],
        });

        this.socket.on("connect", () => {
            console.log("Connected to server with ID:", this.socket.id);
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        this.socket.onAny((message, args: any) => {
            console.log(message, args);
        });
        this.socket.on('new_pawn', (data) => {
            console.log(data);
        });
    }

    getCurrentRoom() {
        return this.currentRoom;
    }

    sendMessage(message: string) {
        this.socket.emit("message", message);
    }

    joinRoom(roomid: number) {
        const join_data = {
            token : localStorage.getItem('token'),
            session_id : roomid
        }
        this.socket.emit("join_room", join_data);
        this.currentRoom = roomid;
    }

    onMessage(callback: (message: string) => void) {
        this.socket.on("message", callback);
    }


    disconnect() {
        this.socket.disconnect();
    }
}

export default SocketService;
