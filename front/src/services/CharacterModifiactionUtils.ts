

class CharacterModificationUtilsService {
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
        await this.request('/api/my/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(character_data)
        });
    }

    async getCharacters(): Promise<any> {
        return await this.request('/api/my/characters', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
    }
}

export default new CharacterModificationUtilsService();
