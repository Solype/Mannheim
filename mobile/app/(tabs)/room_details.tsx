import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import sessionService from '@/services/SessionService';
import { SessionShort } from '@/types/sesssion_types';

const RoomDetails = () => {
    const route = useRoute();
    const { roomId } = route.params;
    const [room, setRoom] = useState<SessionShort | null>(null);

    useEffect(() => {
        loadRoom();
    }, []);

    const loadRoom = async () => {
        try {
            if (!roomId) { return; }
            sessionService.getRoom(roomId).then((room) => {
                setRoom(room);
            });
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };


    return (
        <ImageBackground
            source={require('@/assets/bg-rooms.jpg')}
            style={{flex: 1, justifyContent: 'center'}}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Room Details</Text>
                    <Text style={styles.roomId}>Room ID: {roomId}</Text>
                    <Text style={styles.roomId}>Room Name: {room?.name}</Text>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#FF9800',
    },
    roomId: {
        fontSize: 18,
        color: '#FFF',
    },
});

export default RoomDetails;