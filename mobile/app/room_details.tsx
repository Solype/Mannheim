import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Modal, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import sessionService from '@/services/SessionService';
import { useRoute } from '@react-navigation/native';
import { SessionShort, Pawn } from '@/types/sesssion_types';
import LoginService from '@/services/LoginService';
import SocketService from '@/services/SocketService';
import PawnCard from '@/components/PawnCard';
import { useRouter } from 'expo-router';

interface MonitorAction {
  damage_phys: number;
  damage_path: number;
  damage_ment: number;
  damage_endu: number;
  damage_mana: number;
  receiver?: number;
  dealer?: number;
  method?: string;
}

const RoomView: React.FC = () => {
  const route = useRoute();
  const { roomId } = route.params as { id: string };
  const [room, setRoom] = useState<SessionShort | null>(null);
  const [isGm, setIsGm] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<'heal' | 'attack' | null>(null);
  const [monitorAction, setMonitorAction] = useState<MonitorAction | null>(null);
  const [pawnList, setPawnList] = useState<Pawn[]>([]);
  const [socket, setSocket] = useState<SocketService | null>(null);
  const router = useRouter();
  

  useEffect(() => {
    if (!room) return;
    const socket = new SocketService();
    socket.on("new_pawn", (data: Pawn) => {
      const pawn_id = data.id;
      const existingPawn = pawnList.find((pawn) => pawn.id === pawn_id);

      if (existingPawn) {
        pawnList[pawnList.indexOf(existingPawn)] = data;
        setPawnList([...pawnList]);
      } else {
        setPawnList([...pawnList, data]);
      }
    });

    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [room]);

  useEffect(() => {
    if (!socket || !room) return;
    if (room.id != socket.getCurrentRoom()) {
      socket.joinRoom(room.id);
    }
  }, [socket, room]);

  useEffect(() => {
    const loadRoom = async () => {
      if (!roomId) return;
      try {
        const fetchedRoom = await sessionService.getRoom(roomId);
        setPawnList(fetchedRoom.pawns);
        setRoom(fetchedRoom);
      } catch (error) {
        console.error("Error fetching room:", error);
      }
    };

    loadRoom();
  }, [roomId]);

  useEffect(() => {
    if (!room) return;
    const checkGm = async () => {
      try {
        const userId = await LoginService.whoami();
        if (userId) {
          setIsGm(Number(userId) === room.gm_id);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    checkGm();
  }, [room]);

  const handleSelectTarget = (pawn: Pawn) => {
    setMonitorAction((prev) => ({
      ...prev,
      receiver: pawn.id,
    }));
  };

  const handleAction = () => {
    setIsModalOpen(false);
    setMonitorAction(null);
  };

  const setSelectedPawn = (pawn: Pawn) => {
    setMonitorAction((prev) => {
        if (prev === null) return {
            damage_phys: 0,
            damage_path: 0,
            damage_ment: 0,
            damage_endu: 0,
            damage_mana: 0,
            receiver: undefined,
            dealer: pawn.id,
            method: undefined
        }
        return {...prev, dealer: pawn.id}
    });
}

const setTargetPawn = (pawn: Pawn) => {
    setMonitorAction((prev) => {
        if (prev === null) return {
            damage_phys: 0,
            damage_path: 0,
            damage_ment: 0,
            damage_endu: 0,
            damage_mana: 0,
            receiver: pawn.id,
            dealer: undefined,
            method: undefined
        }
        return {...prev, receiver: pawn.id}
    });
}

  return (
    <ImageBackground
        source={require('@/assets/bg-rooms.jpg')}
        style={{flex: 1, justifyContent: 'center'}}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/characters")}>
            <Text style={{ color: "white", fontSize: 20}}> Retour</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Room: {room?.name}</Text>
          <Text style={styles.subtitle}>Game Master: {room?.gm_name}</Text>
        </View>
        <View style={styles.pawnGrid}>
          {pawnList && pawnList.map((pawn) => (
            <TouchableOpacity key={pawn.id} onPress={() => setModalAction('attack')}>
              <PawnCard pawn={pawn} setModalAction={setModalAction} setSelectedPawn={setSelectedPawn} setIsModalOpen={setIsModalOpen} />
            </TouchableOpacity>
          ))}
        </View>

        <Modal visible={isModalOpen} transparent={true}>
          <View style={styles.modal}>
            <Text style={styles.title}>{modalAction === 'heal' ? 'Sélectionnez un pion à soigner' : 'Sélectionnez un pion à attaquer'}</Text>
            <View style={styles.modalContent}>
              {pawnList.map((pawn) => (
                <Button key={pawn.id} title={pawn.name} onPress={() => handleSelectTarget(pawn)} />
              ))}
            </View>
            {monitorAction?.receiver && (
              <View>
                <Text style={styles.title}>Physical Damage</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={monitorAction.damage_phys.toString()}
                  onChangeText={(value) => setMonitorAction({...monitorAction, damage_phys: Number(value)})}
                />
                <Text style={styles.title}>Pathological Damage</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={monitorAction.damage_path.toString()}
                  onChangeText={(value) => setMonitorAction({...monitorAction, damage_path: Number(value)})}
                />
                <Button title="Confirmer" onPress={handleAction} />
                <Button title="Annuler" onPress={() => { setIsModalOpen(false); setMonitorAction(null); }} />
              </View>
            )}
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
  },
  pawnGrid: {
    flexDirection: 'column',
  },
  pawnCard: {
    width: '48%',
    padding: 10,
    backgroundColor: 'lightgray',
    marginBottom: 10,
    borderRadius: 8,
  },
  modal: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(158, 150, 150)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default RoomView;
