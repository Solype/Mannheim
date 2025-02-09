import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import friendService from '@/services/FriendService';
import UserRequestService from '@/services/UserRequestService';
import { Friend } from '@/types/friend_types';
import { FriendRequest, RoomRequest, CharacterRequest } from '@/types/requests_types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const ProfilePage: React.FC = () => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [newFriendName, setNewFriendName] = useState<string>('');
    const [invitations, setInvitations] = useState<FriendRequest[]>([]);
    const [sessions, setSessions] = useState<RoomRequest[]>([]);
    const [characters, setCharacters] = useState<CharacterRequest[]>([]);
    const router = useRouter();


    useEffect(() => {
        loadFriends();
        loadRequests();
    }, []);

    const loadFriends = async () => {
        try {
            const friends = await friendService.getMyFriends();
            setFriends(friends);
        } catch (error) {
            console.error("Failed to fetch friends:", error);
            Alert.alert("Error", "Failed to fetch friends");
        }
    };

    const loadRequests = async () => {
        try {
            const friendRequests = await UserRequestService.getFriendsRequest();
            const roomRequests = await UserRequestService.getRoomsRequest();
            const characterRequests = await UserRequestService.getCharactersRequest();
            setInvitations(friendRequests);
            setSessions(roomRequests);
            setCharacters(characterRequests);
        } catch (error) {
            console.error("Failed to load requests:", error);
            Alert.alert("Error", "Failed to load requests");
        }
    };

    const handleAddFriend = async () => {
        if (!newFriendName.trim()) return;
        try {
            await friendService.requestFriend(newFriendName);
            setNewFriendName('');
            loadFriends(); 
        } catch (error) {
            console.error("Failed to add friend:", error);
            Alert.alert("Error", "Failed to add friend");
        }
    };

    const handleRequestAction = async (request_id: number, type: string, action: string) => {
        try {
            if (type === 'friend') {
                action === 'accept'
                    ? await UserRequestService.acceptFriendRequest(request_id)
                    : await UserRequestService.rejectFriendRequest(request_id);
                setInvitations((prev) => prev.filter((inv) => inv.request_id !== request_id));
            } else if (type === 'room') {
                action === 'accept'
                    ? await UserRequestService.acceptRoomRequest(request_id)
                    : await UserRequestService.rejectRoomRequest(request_id);
                setSessions((prev) => prev.filter((session) => session.request_id !== request_id));
            } else if (type === 'character') {
                action === 'accept'
                    ? await UserRequestService.acceptCharacterRequest(request_id)
                    : await UserRequestService.rejectCharacterRequest(request_id);
                setCharacters((prev) => prev.filter((char) => char.request_id !== request_id));
            }
        } catch (error) {
            console.error(`Failed to ${action} ${type} request:`, error);
            Alert.alert("Error", `Failed to ${action} ${type} request`);
        }
    };

    const logout = () => {
        AsyncStorage.removeItem('token');
        router.push('/');
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>Welcome to the Profile!</Text>
            <Button title="Logout" onPress={() => logout()} />

            <Text>Friends: {friends.length}</Text>
            <View>
                {friends.map((friend) => (
                    <Text key={friend.id} style={styles.friendName}>
                        {friend.name}
                    </Text>
                ))}
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newFriendName}
                    onChangeText={setNewFriendName}
                    placeholder="Enter friend's name"
                />
                <Button title="Add Friend" onPress={handleAddFriend} />
            </View>

            <Text style={styles.sectionTitle}>Friend Requests</Text>
            <View>
                {invitations.map((invitation) => (
                    <View key={invitation.request_id} style={styles.requestItem}>
                        <Text>{invitation.sender_name} sent a request to {invitation.receiver_name}</Text>
                        <TouchableOpacity
                            style={styles.acceptButton}
                            onPress={() => handleRequestAction(invitation.request_id, 'friend', 'accept')}
                        >
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.declineButton}
                            onPress={() => handleRequestAction(invitation.request_id, 'friend', 'decline')}
                        >
                            <Text style={styles.buttonText}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <Text style={styles.sectionTitle}>Room Requests</Text>
            <View>
                {sessions.map((session) => (
                    <View key={session.room_id} style={styles.requestItem}>
                        <Text>{session.sender_name} sent a room request to {session.receiver_name}</Text>
                        <TouchableOpacity
                            style={styles.acceptButton}
                            onPress={() => handleRequestAction(session.request_id, 'room', 'accept')}
                        >
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.declineButton}
                            onPress={() => handleRequestAction(session.request_id, 'room', 'decline')}
                        >
                            <Text style={styles.buttonText}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <Text style={styles.sectionTitle}>Character Requests</Text>
            <View>
                {characters.map((character) => (
                    <View key={character.request_id} style={styles.requestItem}>
                        <Text>{character.sender_name} sent a character request to {character.receiver_name}</Text>
                        <TouchableOpacity
                            style={styles.acceptButton}
                            onPress={() => handleRequestAction(character.request_id, 'character', 'accept')}
                        >
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.declineButton}
                            onPress={() => handleRequestAction(character.request_id, 'character', 'decline')}
                        >
                            <Text style={styles.buttonText}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 18,
        marginVertical: 10,
    },
    friendName: {
        fontSize: 16,
        marginVertical: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    requestItem: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    acceptButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    declineButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ProfilePage;
