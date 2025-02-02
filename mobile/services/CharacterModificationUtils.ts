import AsyncStorage from '@react-native-async-storage/async-storage';

class CharacterModificationUtilsService {
    // private baseURL = __DOCKER_HOST_IP__ ? `http://${__DOCKER_HOST_IP__}:8080` : `http://${__MY_LOCAL_IP__}:8080`;
    private baseURL = `localhost:8080`;

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

    async getGods(): Promise<string[]> {
        return await this.request<string[]>('/api/gods');
    }

    async getMetaraces(): Promise<string[]> {
        return await this.request<string[]>('/api/metaraces');
    }

    async getMagicLanguages(): Promise<string[]> {
        return await this.request<string[]>('/api/magic_languages');
    }

    async createCharacter(character_data: any): Promise<void> {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            await this.request('/api/my/characters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(character_data)
            });
        } else {
            throw new Error('Token non trouvé');
        }
    }

    async getCharacters(): Promise<any> {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            return await this.request('/api/my/characters', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
        } else {
            throw new Error('Token non trouvé');
        }
    }

    async getCharacter(character_id: string): Promise<any> {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            return await this.request(`/api/my/characters/${character_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
        } else {
            throw new Error('Token non trouvé');
        }
    }

    async updateCharacter(character_data: any, character_id: string): Promise<void> {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            await this.request(`/api/my/characters/${character_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(character_data)
            });
        } else {
            throw new Error('Token non trouvé');
        }
    }
}

export default new CharacterModificationUtilsService();
