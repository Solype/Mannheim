import { Friend } from "@/types/friend_types";
import AService from "./AService";

class FriendService extends AService {
    public async getMyFriends(): Promise<Friend[]> {
        return await this.request<Friend[]>('/api/my/friends', {
            headers: this.getHeaders(),
        });
    }

    public async requestFriend(friend_name: string): Promise<void> {
        return await this.request<void>('/api/my/friends', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ friend_name }),
        });
    }
}

const friendService = new FriendService();
export default friendService;
