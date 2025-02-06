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

    async acceptRoomRequest(room_id: number): Promise<void> {
        return await this.request<void>(`/api/my/requests/sessions/${room_id}/accept`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }

    async acceptCharacterRequest(character_id: number): Promise<void> {
        return await this.request<void>(`/api/my/requests/characters/${character_id}/accept`, {
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

    async rejectFriendRequest(friend_id: number): Promise<void> {
        return await this.request<void>(`/api/my/friends/requests/${friend_id}/decline`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }

    async rejectRoomRequest(room_id: number): Promise<void> {
        return await this.request<void>(`/api/my/requests/sessions/${room_id}/decline`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }

    async rejectCharacterRequest(character_id: number): Promise<void> {
        return await this.request<void>(`/api/my/requests/characters/${character_id}/decline`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }

    async sendRoomInvitation(roomId: number, user_id: number): Promise<void> {
        return await this.request<void>(`/api/my/requests/sessions`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({"session_id": roomId, "receiver_id": user_id})
            }
        );
    }

    async sendCharacterInvitation(sessionId: number, character_id: number): Promise<void> {
        return await this.request<void>(`/api/my/session/pawn/request`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({"session_id": sessionId, "character_id": character_id})
            }
        );
    }

}

export default new UserRequestService();
