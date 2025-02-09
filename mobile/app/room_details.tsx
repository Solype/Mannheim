import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import sessionService from '@/services/SessionService';
import { useRoute } from '@react-navigation/native';
import LoginService from '@/services/LoginService';
import { Pawn, SessionShort } from '@/types/sesssion_types';
import SelectFriend from '@/components/SelectFriends';
import SelectCharacter from '@/components/SelectCharacters';


const RoomDetails = () => {
  const route = useRoute();
  const { roomId } = route.params;
  const [room, setRoom] = useState<SessionShort | null>(null);
  const [isGm, setIsGm] = useState(false);
  const [GmId, setGmId] = useState('');
  const [pawns, setPawns] = useState<Pawn[]>([]);

  useEffect(() => {
    const loadRoom = async () => {
      if (!roomId) return;
      try {
        const fetchedRoom = await sessionService.getRoom(roomId);
        setRoom(fetchedRoom);
        console.log('Room loaded:', fetchedRoom);
        const fetchedPawns = fetchedRoom?.pawns || [];
        setPawns(fetchedPawns);
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };

    loadRoom();
  }, []);

  useEffect(() => {
    if (!room) return;

    const checkGm = async () => {
      try {
        const userId = await LoginService.whoami();
        if (userId) {
          setGmId(userId);
          setIsGm(Number(userId) === room.gm_id);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    checkGm();
  }, [room]);

  return (
    <ImageBackground
        source={require('@/assets/bg-rooms.jpg')}
        style={{flex: 1, justifyContent: 'center'}}
    >
        <View style={styles.container}>
            <Text style={styles.title}>Room: {room?.name}</Text>
            {isGm ? (
                <SelectFriend room_id={room?.id} />
            ) : (
                <SelectCharacter room_id={room?.id} />
            )}
            <Text style={styles.text}>Game Master: {room?.gm_name}</Text>
            <Text style={styles.text}>{room?.description}</Text>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    text: {
      fontSize: 16,
      color: '#fff',
    },
  });
  

export default RoomDetails;