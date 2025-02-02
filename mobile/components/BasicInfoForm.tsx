import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface BasicCharaInfo {
  name: string;
  age: number;
  race: string;
  gender: string;
}

interface BasicFormProps {
  formData: BasicCharaInfo;
  setFormData: (formData: BasicCharaInfo) => void;
  disabled: boolean;
}

const BasicForm = ({ formData, setFormData, disabled }: BasicFormProps) => {
  const handleChange = (name: string, value: string | number) => {
    setFormData({ ...formData, [name]: name === "age" ? Number(value) : value });
  };

  const handleSubmit = () => {
    Alert.alert("Form Submitted", "The form has been submitted successfully.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Identité</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(value) => handleChange("name", value)}
          placeholder="Entrez le nom"
          editable={!disabled}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Âge</Text>
        <TextInput
          style={styles.input}
          value={formData.age.toString()}
          onChangeText={(value) => handleChange("age", value)}
          placeholder="Entrez l'âge"
          keyboardType="numeric"
          min="0"
          editable={!disabled}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Espèce</Text>
        <TextInput
          style={styles.input}
          value={formData.race}
          onChangeText={(value) => handleChange("race", value)}
          placeholder="Entrez l'espèce"
          editable={!disabled}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Genre</Text>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(value) => handleChange("gender", value)}
          enabled={!disabled}
          style={styles.picker}
        >
          <Picker.Item label="Choisissez le genre" value="" />
          <Picker.Item label="Masculin" value="male" />
          <Picker.Item label="Féminin" value="female" />
          <Picker.Item label="Autre" value="other" />
        </Picker>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    opacity: 0.8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
  },
  picker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
  },
});

export default BasicForm;
