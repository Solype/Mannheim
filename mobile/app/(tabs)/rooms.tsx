import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, ScrollView, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Trash2 } from 'lucide-react-native';
import sessionService from '@/services/SessionService';
import LoginService from '@/services/LoginService';
import { SessionShort } from '@/types/sesssion_types';

const RoomsScreen: React.FC = () => {
    const [rooms, setRooms] = useState<SessionShort[]>([]);
    const [newRoomName, setNewRoomName] = useState<string>('');
    const [myId, setMyId] = useState<number>(0);
    const navigation = useNavigation();

    useEffect(() => {
        fetchRooms();
        LoginService.whoami().then((data) => {
            if (data) {
                setMyId(parseInt(data));
            }
        });
    }, []);

    const fetchRooms = async () => {
        try {
            const fetchedRooms = await sessionService.getAllSessions();
            setRooms(fetchedRooms);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    const handleAddRoom = async () => {
        if (!newRoomName.trim()) return;

        try {
            const newRoom = await sessionService.createSession(newRoomName, '');
            setRooms([...rooms, newRoom]);
            setNewRoomName('');
        } catch (error) {
            console.error('Error adding room:', error);
        }
    };

    const handleDeleteRoom = async (roomId: number) => {
        try {
            await sessionService.deleteSession(roomId);
            setRooms(rooms.filter((room) => room.id !== roomId));
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    return (
        <ImageBackground
            source={require('@/assets/bg-rooms.jpg')}
            style={{flex: 1, justifyContent: 'center'}}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
                <View style={{ marginTop: 40, alignItems: 'center' }}>
                    <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#FF9800', textAlign: 'center' }}>Rooms</Text>
                    <Text style={{ fontSize: 18, marginTop: 10, color: '#FFF', textAlign: 'center' }}>
                        Gérer vos rooms ci-dessous
                    </Text>
                </View>

                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput
                        value={newRoomName}
                        onChangeText={setNewRoomName}
                        placeholder="Entrez le nom de la room"
                        style={{
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: '#FFF',
                            padding: 10,
                            width: '70%',
                            marginRight: 10,
                        }}
                    />
                    <Button title="Créer" onPress={handleAddRoom} color="#4CAF50" />
                </View>

                <View style={{ marginTop: 20, backgroundColor: '#333', borderRadius: 5, padding: 10 }}>
                    {rooms.length > 0 ? (
                        rooms.map((room) => (
                            <View
                                key={room.id}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#555',
                                }}
                            >
                                <Text style={{ fontSize: 18, color: '#FFF' }}>
                                    {room.name} - {room.gm_name}
                                </Text>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('room_details', { roomId: room.id })}
                                        style={{
                                            backgroundColor: '#4CAF50',
                                            padding: 10,
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text style={{ color: '#FFF' }}>Entrer</Text>
                                    </TouchableOpacity>
                                    {room.gm_id === myId && (
                                        <TouchableOpacity
                                            onPress={() =>
                                                Alert.alert(
                                                    'Confirmation',
                                                    'Voulez-vous vraiment supprimer cette room ?',
                                                    [
                                                        { text: 'Annuler', style: 'cancel' },
                                                        {
                                                            text: 'Supprimer',
                                                            onPress: () => handleDeleteRoom(room.id),
                                                            style: 'destructive',
                                                        },
                                                    ]
                                                )
                                            }
                                            style={{
                                                backgroundColor: '#F44336',
                                                padding: 10,
                                                borderRadius: 5,
                                                marginLeft: 10,
                                            }}
                                        >
                                            <Text style={{ color: '#FFF' }}>Supprimer</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={{ alignItems: 'center', opacity: 0.8, marginTop: 20 }}>
                            <Image source={require('@/assets/door.png')} style={{ width: 200, height: 200 }} />
                            <Text style={{ fontSize: 24, color: '#FFF', marginTop: 10 }}>No rooms available.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
         </ImageBackground>
    );
};

export default RoomsScreen;
