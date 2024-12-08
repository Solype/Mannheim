import AService from "@/services/AService";

class UserRequestService extends AService {

    async getFriendsRequest(): Promise<string[]> {
        return await this.request<string[]>('/api/my/requests/friends', {
                method: 'GET',
                headers: this.getHeaders(),
            }
        );
    }

    async getRoomsRequest(): Promise<string[]> {
        return await this.request<string[]>('/api/my/requests/sessions', {
                method: 'GET',
                headers: this.getHeaders(),
            }
        );
    }

    async getCharactersRequest(): Promise<string[]> {
        return await this.request<string[]>('/api/my/requests/characters', {
                method: 'GET',
                headers: this.getHeaders(),
            }
        );
    }


    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    //
    // ACCEPT REQUEST
    //
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////

    async acceptFriendRequest(friendId: string): Promise<void> {
        return await this.request<void>('/api/my/friends/requests/accept', {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ friendId }),
            }
        );
    }

    async acceptRoomRequest(roomId: string): Promise<void> {
        return await this.request<void>('/api/my/rooms/requests/accept', {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ roomId }),
            }
        );
    }

    async acceptCharacterRequest(characterId: string): Promise<void> {
        return await this.request<void>('/api/my/characters/requests/accept', {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ characterId }),
            }
        );
    }

    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    //
    // ACCEPT REQUEST
    //
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////

    async rejectFriendRequest(friendId: string): Promise<void> {
        return await this.request<void>('/api/my/friends/requests/reject', {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ friendId }),
            }
        );
    }

    async rejectRoomRequest(roomId: string): Promise<void> {
        return await this.request<void>('/api/my/rooms/requests/reject', {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ roomId }),
            }
        );
    }

    async rejectCharacterRequest(characterId: string): Promise<void> {
        return await this.request<void>('/api/my/characters/requests/reject', {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ characterId }),
            }
        );
    }
}

export default new UserRequestService();
