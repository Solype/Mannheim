import AService from "@/services/AService";
import { FriendRequest } from "@/types/requests_types";

class UserRequestService extends AService {

    async getFriendsRequest(): Promise<FriendRequest[]> {
        return await this.request<FriendRequest[]>('/api/my/requests/friends', {
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

    async acceptFriendRequest(request_id: number): Promise<void> {
        return await this.request<void>(`/api/my/requests/friends/${request_id}/accept`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }

    async acceptRoomRequest(roomId: number): Promise<void> {
        return await this.request<void>(`/api/my/rooms/requests/${roomId}/accept`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }

    async acceptCharacterRequest(characterId: number): Promise<void> {
        return await this.request<void>(`/api/my/characters/requests/${characterId}/accept`, {
                method: 'POST',
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

    async rejectFriendRequest(friendId: number): Promise<void> {
        return await this.request<void>(`/api/my/friends/requests/${friendId}/decline`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }

    async rejectRoomRequest(roomId: number): Promise<void> {
        return await this.request<void>(`/api/my/rooms/requests/${roomId}/decline`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }

    async rejectCharacterRequest(characterId: number): Promise<void> {
        return await this.request<void>(`/api/my/characters/requests/${characterId}/decline`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }
}

export default new UserRequestService();
