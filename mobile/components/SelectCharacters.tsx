import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, Button, Modal, TouchableOpacity } from 'react-native';
// import sessionService from '@/services/SessionService';
// import { useRoute } from '@react-navigation/native';
// import LoginService from '@/services/LoginService';
// import friendService from '@/services/FriendService';
import UserRequestService from '@/services/UserRequestService';
import CharacterModificationUtilsService from '@/services/CharacterModificationUtils';
import { Picker } from '@react-native-picker/picker'; // Use Picker for select dropdown
// import { SessionShort } from '@/types/sesssion_types';

interface SelectCharacterProps {
    room_id: number;
}

const SelectCharacter = ({ room_id }: SelectCharacterProps) => {
    const [characters, setCharacters] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const hasLoaded = useRef(false);
    const [characterSelected, setCharacterSelected] = useState(null);
  
    const openModal = () => {
      if (!hasLoaded.current) {
        CharacterModificationUtilsService.getCharacters().then((characters) => {
          setCharacters(characters);
          hasLoaded.current = true;
        });
      }
      setModalVisible(true);
    };
  
    const confirm = () => {
      if (!characterSelected) {
        Alert.alert('Veuillez sélectionner un personnage');
        return;
      }
      UserRequestService.sendCharacterInvitation(room_id, characterSelected).then(() => {
        setModalVisible(false);
      });
    };
  
    return (
      <View>
        <Button title="Ajouter un personnage" onPress={openModal} />
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Ajouter un personnage</Text>
            <Picker
              selectedValue={characterSelected}
              onValueChange={(itemValue) => setCharacterSelected(itemValue)}
            >
              {characters.map((character) => (
                <Picker.Item
                  key={character.id}
                  label={character.infos.name}
                  value={character.id}
                />
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
  
  export default SelectCharacter;