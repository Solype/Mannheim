import { Friend } from "@/types/friend_types";
import AService from "./AService";

class FriendService extends AService {
    public async getMyFriends(): Promise<Friend[]> {
        const headers = await this.getHeaders();
    
        return await this.request<Friend[]>('/api/my/friends', {
            headers,
        });
    }

    public async requestFriend(friend_name: string): Promise<void> {
        const headers = await this.getHeaders();

        return await this.request<void>('/api/my/friends', {
            method: 'POST',
            headers,
            body: JSON.stringify({ friend_name }),
        });
    }
}

const friendService = new FriendService();
export default friendService;
