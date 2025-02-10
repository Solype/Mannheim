import AService from "@/services/AService";
import { FriendRequest, RoomRequest, CharacterRequest } from "@/types/requests_types";

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

    async getCharactersRequest(): Promise<CharacterRequest[]> {
        return await this.request<CharacterRequest[]>('/api/my/session/pawn/requests', {
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

    async acceptRoomRequest(request_id: number): Promise<void> {
        return await this.request<void>(`/api/my/requests/sessions/${request_id}/accept`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }

    async acceptCharacterRequest(request_id: number): Promise<void> {
        return await this.request<void>(`/api/my/session/pawn/request/${request_id}/accept`, {
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

    async rejectFriendRequest(request_id: number): Promise<void> {
        return await this.request<void>(`/api/my/friends/requests/${request_id}/decline`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }

    async rejectRoomRequest(request_id: number): Promise<void> {
        return await this.request<void>(`/api/my/requests/sessions/${request_id}/decline`, {
                method: 'POST',
                headers: this.getHeaders(),
            }
        );
    }

    async rejectCharacterRequest(request_id: number): Promise<void> {
        return await this.request<void>(`/api/my/session/pawn/request/${request_id}/decline`, {
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
