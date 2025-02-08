import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';
import { Attributes } from '@/types/character_types';
import { dico } from '@/types/dico';

interface AttributesFormProps {
  attributes: Attributes;
  setter: (attributes: Attributes) => void;
  disabled: boolean;
}

export default function AttributesForm({ attributes, setter, disabled }: AttributesFormProps) {
  const onRoleValueChange = (attribute: string, value: string) => {
    setter({
      ...attributes,
      [attribute]: Number(value),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Attributs</Text>

      {Object.entries(attributes).map(([attribute, value]) => (
        attribute && (
          <View key={attribute} style={styles.inputContainer}>
            <Text style={styles.label}>{dico[attribute] ?? attribute}</Text>
            <TextInput
              style={styles.input}
              value={String(value)}
              onChangeText={(text) => onRoleValueChange(attribute, text)}
              keyboardType="numeric"
              editable={!disabled}
            />
          </View>
        )
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    textTransform: 'capitalize',
  },
  input: {
    height: 40,
    width: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});
