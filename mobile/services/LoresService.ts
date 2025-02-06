import { LoreEntities, LoreStories, LoreStory } from '@/types/lore_types';
import AsyncStorage from '@react-native-async-storage/async-storage';


class LoresService {
    private ip: string | null = null;
    private baseURL: string = '';

    constructor() {
        this.init();
    }

    private async init() {
        if (typeof window !== 'undefined') {
            this.ip = await AsyncStorage.getItem('ip');
            if (this.ip) {
                this.baseURL = `http://${this.ip}:8080`;
            } else {
                console.warn('IP non trouvée dans AsyncStorage');
                this.baseURL = 'http://localhost:8080';
            }
        } else {
            console.warn('AsyncStorage n\'est pas disponible dans cet environnement.');
        }
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, options);
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            return await response.json();
        } catch (error) {
            console.error(`Erreur sur ${endpoint}:`, error);
            throw error;
        }
    }
    private getHeaders(includeAuth: boolean = true): HeadersInit {
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
            };
            if (includeAuth) {
                const token = AsyncStorage.getItem('token');
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
            }
            return headers;
    }

    async getLoreStories(): Promise<LoreStories[]> {
        return await this.request<LoreStories[]>('/api/lore/stories', {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }

    async getLoreEntities(): Promise<LoreEntities[]> {
        return await this.request<LoreEntities[]>('/api/lore/entities', {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }

    async getLoreStory(id: string): Promise<LoreStory> {
        return await this.request<LoreStory>(`/api/lore/story/${id}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }
}

export default new LoresService();
