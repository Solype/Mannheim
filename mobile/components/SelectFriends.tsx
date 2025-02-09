import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, Button, Modal, TouchableOpacity } from 'react-native';
import friendService from '@/services/FriendService';
import UserRequestService from '@/services/UserRequestService';
import { Picker } from '@react-native-picker/picker'; // Use Picker for select dropdown
import { Friend } from '@/types/friend_types';

interface SelectFriendsProps {
    room_id: number;
}

const SelectFriend = ({ room_id }: SelectFriendsProps) => {
    const [friend, setFriend] = useState<Friend[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const hasLoaded = useRef(false);
    const [friendSelected, setFriendSelected] = useState(null);
  
    const openModal = () => {
      if (!hasLoaded.current) {
        friendService.getMyFriends().then((friends) => {
          setFriend(friends);
        });
        hasLoaded.current = true;
      }
      setModalVisible(true);
    };
  
    const confirm = () => {
      if (!friendSelected) {
        Alert.alert('Veuillez sélectionner un ami');
        return;
      }
      UserRequestService.sendRoomInvitation(room_id, friendSelected).then(() => {
        setModalVisible(false);
      });
    };
  
    return (
      <View>
        <Button title="Ajouter un Ami" onPress={openModal} />
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Ajouter un Ami</Text>
            <Picker
              selectedValue={friendSelected}
              onValueChange={(itemValue) => setFriendSelected(itemValue)}
            >
              {friend.map((f) => (
                <Picker.Item key={f.id} label={f.name} value={f.id} />
              ))}
            </Picker>
            <View style={styles.modalButtons}>
              <Button title="Ajouter" onPress={confirm} />
              <Button title="Annuler" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
    },
  });

export default SelectFriend;
  