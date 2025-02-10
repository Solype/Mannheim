import AService from "@/services/AService";
import { FriendRequest, RoomRequest, CharacterRequest } from "@/types/requests_types";

class UserRequestService extends AService {

    async getFriendsRequest(): Promise<FriendRequest[]> {
        const headers = await this.getHeaders();

        return await this.request<FriendRequest[]>('/api/my/requests/friends', {
                method: 'GET',
                headers,
            }
        );
    }

    async getRoomsRequest(): Promise<RoomRequest[]> {
        const headers = await this.getHeaders();

        return await this.request<RoomRequest[]>('/api/my/requests/sessions', {
                method: 'GET',
                headers,
            }
        );
    }

    async getCharactersRequest(): Promise<CharacterRequest[]> {
        const headers = await this.getHeaders();

        return await this.request<CharacterRequest[]>('/api/my/session/pawn/requests', {
                method: 'GET',
                headers,
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
        const headers = await this.getHeaders();

        return await this.request<void>(`/api/my/requests/friends/${request_id}/accept`, {
                method: 'POST',
                headers,
            }
        );
    }

    async acceptRoomRequest(roomId: number): Promise<void> {
        const headers = await this.getHeaders();

        return await this.request<void>(`/api/my/requests/sessions/${roomId}/accept`, {
                method: 'POST',
                headers,
            }
        );
    }

    async acceptCharacterRequest(characterId: number): Promise<void> {
        const headers = await this.getHeaders();

        return await this.request<void>(`/api/my/session/pawn/request/${characterId}/accept`, {
                method: 'POST',
                headers,
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
        const headers = await this.getHeaders();

        return await this.request<void>(`/api/my/friends/requests/${friendId}/decline`, {
                method: 'POST',
                headers,
            }
        );
    }

    async rejectRoomRequest(roomId: number): Promise<void> {
        const headers = await this.getHeaders();

        return await this.request<void>(`/api/my/requests/sessions/${roomId}/decline`, {
                method: 'POST',
                headers,
            }
        );
    }

    async rejectCharacterRequest(characterId: number): Promise<void> {
        const headers = await this.getHeaders();

        return await this.request<void>(`/api/my/session/pawn/request/${characterId}/decline`, {
                method: 'POST',
                headers,
            }
        );
    }

    async sendRoomInvitation(roomId: number, user_id: number): Promise<void> {
        const headers = await this.getHeaders();

        return await this.request<void>(`/api/my/requests/sessions`, {
                method: 'POST',
                headers,
                body: JSON.stringify({"session_id": roomId, "receiver_id": user_id})
            }
        );
    }

    async sendCharacterInvitation(sessionId: number, character_id: number): Promise<void> {
        const headers = await this.getHeaders();

        return await this.request<void>(`/api/my/session/pawn/request`, {
                method: 'POST',
                headers,
                body: JSON.stringify({"session_id": sessionId, "character_id": character_id})
            }
        );
    }
}

export default new UserRequestService();
