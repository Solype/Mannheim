import { io, Socket } from "socket.io-client";
import AsyncStorage from '@react-native-async-storage/async-storage';

class SocketService {
    private socket: Socket | null = null;
    private ip: string | null = null;
    private baseURL: string = '';
    private currentRoom?: number;
    private callbacks: { [event: string]: ((data: any) => void)[] } = {};

    constructor() {
        this.init();
    }

    private async init() {
        try {
            this.ip = await AsyncStorage.getItem('ip');
            if (this.ip) {
                this.baseURL = `http://${this.ip}:8080`;
            } else {
                console.warn('IP non trouvée dans AsyncStorage');
                this.baseURL = 'http://localhost:8080';
            }
            this.initSocket();
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'IP :', error);
        }
    }

    private initSocket() {
        this.socket = io(this.baseURL, {
            transports: ["websocket"],
        });

        this.socket.on("connect", () => {
            console.log("Connected to server with ID:", this.socket!.id);
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        this.socket.onAny((message, args: any) => {
            console.log(message, args);
            this.callbacks[message]?.forEach((callback) => callback(args));
        });
    }

    getCurrentRoom() {
        return this.currentRoom;
    }

    async joinRoom(roomid: number) {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            console.error('Token non trouvé');
            return;
        }

        const join_data = {
            token: token,
            session_id: roomid
        };

        this.socket?.emit("join_room", join_data);
        this.currentRoom = roomid;
    }

    on(event: string, callback: (data: any) => void) {
        if (!this.callbacks[event]) {
            this.callbacks[event] = [];
        }
        this.callbacks[event].push(callback);
        this.socket?.on(event, (data: any) => {
            this.callbacks[event].forEach((callback) => callback(data));
        });
    }


    emit(event: string, data: any) {
        this.socket?.emit(event, data);
    }

    disconnect() {
        this.socket?.disconnect();
    }
}

export default SocketService;
