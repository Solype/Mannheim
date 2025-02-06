import { LoreEntities, LoreStories, LoreStory } from '@/types/lore_types';

class LoresService {
    private baseURL = __DOCKER_HOST_IP__ ? `http://${__DOCKER_HOST_IP__}:8080` : `http://${__MY_LOCAL_IP__}:8080`;


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
                const token = localStorage.getItem('token');
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
