class UserRequestService
{
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

    async getFriendsRequest(): Promise<string[]> {
        return await this.request<string[]>('/api/friends/requests',
            {
                method: 'GET',
                headers: this.getHeaders(),
            }
        );
    }

    async getRoomsRequest(): Promise<string[]> {
        return await this.request<string[]>('/api/rooms/requests',
            {
                method: 'GET',
                headers: this.getHeaders(),
            }
        );
    }

    async getCharactersRequest(): Promise<string[]> {
        return await this.request<string[]>('/api/characters/requests',
            {
                method: 'GET',
                headers: this.getHeaders(),
            }
        );
    }

    async acceptFriendRequest(friendId: string): Promise<void> {
        return await this.request<void>('/api/friends/requests/accept',
            {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ friendId }),
            }
        );
    }

    async acceptRoomRequest(roomId: string): Promise<void> {
        return await this.request<void>('/api/rooms/requests/accept',
            {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ roomId }),
            }
        );
    }

    async acceptCharacterRequest(characterId: string): Promise<void> {
        return await this.request<void>('/api/characters/requests/accept',
            {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ characterId }),
            }
        );
    }

    async rejectFriendRequest(friendId: string): Promise<void> {
        return await this.request<void>('/api/friends/requests/reject',
            {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ friendId }),
            }
        );
    }

    async rejectRoomRequest(roomId: string): Promise<void> {
        return await this.request<void>('/api/rooms/requests/reject',
            {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ roomId }),
            }
        );
    }

    async rejectCharacterRequest(characterId: string): Promise<void> {
        return await this.request<void>('/api/characters/requests/reject',
            {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ characterId }),
            }
        );
    }
}

export default new UserRequestService();
