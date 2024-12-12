import friendService from '@/services/FriendService';
import { Friend } from '@/types/friend_types';
import React, { useEffect, useState } from 'react';

const ProfilePage: React.FC = () => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [newFriendName, setNewFriendName] = useState<string>('');

    useEffect(() => {
        loadFriends();
    }, []);

    const loadFriends = async () => {
        try {
            const friends = await friendService.getMyFriends();
            setFriends(friends);
        } catch (error) {
            console.error("Failed to fetch friends:", error);
        }
    };

    const handleAddFriend = async () => {
        if (!newFriendName.trim()) return; // Ne rien faire si le nom est vide
        try {
            await friendService.requestFriend(newFriendName);
            setNewFriendName('');
        } catch (error) {
            console.error("Failed to add friend:", error);
        }
    };

    return (
        <div className="text-center mt-5">
            <h1 className="text-4xl font-bold">Profile</h1>
            <p className="text-lg mt-4">Welcome to the Profile!</p>

            {/* Liste des amis */}
            <p>Friends: {friends.length}</p>
            <div>
                {friends.map((friend) => (
                    <p key={friend.id}>{friend.name}</p>
                ))}
            </div>

            {/* Ajouter un ami */}
            <div className="mt-5">
                <input
                    type="text"
                    value={newFriendName}
                    onChange={(e) => setNewFriendName(e.target.value)}
                    placeholder="Enter friend's name"
                    className="border border-gray-300 rounded p-2"
                />
                <button
                    onClick={handleAddFriend}
                    className="ml-2 bg-blue-500 text-white p-2 rounded"
                >
                    Add Friend
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
