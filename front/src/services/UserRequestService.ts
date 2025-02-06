import AService from "@/services/AService";
import { FriendRequest, RoomRequest } from "@/types/requests_types";
import UtilsService from "@/services/UtilsService";

class UserRequestService extends AService {

    async getFriendsRequest(): Promise<FriendRequest[]> {
        return await this.request<FriendRequest[]>('/api/my/requests/friends', {
                method: 'GET',
                headers: this.getHeaders(),
            }
        );
    }

    async getRoomsRequest(): Promise<RoomRequest[]> {
        return await this.request<RoomRequest[]>('/api/my/requests/sessions', {
                method: 'GET',
                headers: this.getHeaders(),
            }
        );
    }

    async getCharactersRequest(): Promise<string[]> {
        return await this.request<string[]>('/api/my/session/pawn/requests', {
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
        return await this.request<void>(`/api/my/requests/sessions/${roomId}/accept`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }

    async acceptCharacterRequest(characterId: number): Promise<void> {
        return await this.request<void>(`/api/my/requests/characters/${characterId}/accept`, {
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
        return await this.request<void>(`/api/my/requests/sessions/${roomId}/decline`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }

    async rejectCharacterRequest(characterId: number): Promise<void> {
        return await this.request<void>(`/api/my/requests/characters/${characterId}/decline`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }

    async sendRoomInvitation(roomId: number, userId: number): Promise<void> {
        return await this.request<void>(`/api/my/requests/sessions`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({"session_id": roomId, "receiver_id": userId})
            }
        );
    }

    async sendCharacterInvitation(sessionId: number, characterName: string): Promise<void> {
        const characterId = await UtilsService.getCharacterIdByName(characterName);
        return await this.request<void>(`/api/my/session/pawn/request`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({"session_id": sessionId, "character_id": characterId})
            }
        );
    }

}

export default new UserRequestService();
