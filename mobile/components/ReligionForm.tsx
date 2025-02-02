import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import CharacterModificationUtils from '@/services/CharacterModificationUtils';
import { Religion } from '@/types/character_types';
import { Picker } from '@react-native-picker/picker';

interface ReligionFormProps {
  listReligions: Religion[];
  setter: (gods: Religion[]) => void;
  disabled: boolean;
}

const ReligionForm = ({ listReligions, setter, disabled }: ReligionFormProps) => {
  const [availableReligions, setAvailableReligions] = useState<string[]>([]);

  useEffect(() => {
    CharacterModificationUtils.getGods().then(setAvailableReligions);
  }, []);

  const handleAddReligion = () => {
    if (availableReligions.length === 0) return;

    const firstReligion = availableReligions[0];
    setter([...listReligions, { god: firstReligion, devotion: 0 }]);
    setAvailableReligions((prev) => prev.filter((god) => god !== firstReligion));
  };

  const handleReligionChange = (index: number, newName: string) => {
    const updatedReligions = [...listReligions];
    const oldName = updatedReligions[index].god;

    updatedReligions[index].god = newName;
    setter(updatedReligions);

    setAvailableReligions((prev) => {
      const updatedAvailableReligions = prev.filter((god) => god !== newName);
      if (oldName) updatedAvailableReligions.push(oldName);
      return updatedAvailableReligions;
    });
  };

  const handleDevotionChange = (index: number, devotion: number) => {
    const updatedReligions = [...listReligions];
    updatedReligions[index].devotion = devotion;
    setter(updatedReligions);
  };

  const handleRemoveReligion = (index: number) => {
    const updatedReligions = [...listReligions];
    const [removedReligion] = updatedReligions.splice(index, 1);
    setter(updatedReligions);
    setAvailableReligions((prev) => [...prev, removedReligion.god].sort());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Religions</Text>

      <View style={styles.religionList}>
        {listReligions.map((god, index) => (
          <View key={index} style={styles.religionItem}>
            <Picker
              selectedValue={god.god}
              onValueChange={(itemValue) => handleReligionChange(index, itemValue)}
              enabled={!disabled}
              style={styles.picker}
            >
              {availableReligions.map((availableReligion) => (
                <Picker.Item key={availableReligion} label={availableReligion} value={availableReligion} />
              ))}
            </Picker>

            <TextInput
              style={styles.devotionInput}
              value={String(god.devotion)}
              onChangeText={(text) => handleDevotionChange(index, Number(text))}
              keyboardType="numeric"
              placeholder="Devotion"
            />

            {!disabled && (
              <Button
                title="Remove"
                onPress={() => handleRemoveReligion(index)}
                color="#ff6347"
              />
            )}
          </View>
        ))}
      </View>

      {!disabled && (
        <Button
          title="Ajouter une religion"
          onPress={handleAddReligion}
          disabled={availableReligions.length === 0}
          color="#4CAF50"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    opacity: 0.8,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 16,
  },
  religionList: {
    marginBottom: 20,
  },
  religionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
  },
  devotionInput: {
    width: 60,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    textAlign: 'center',
  },
});

export default ReligionForm;
