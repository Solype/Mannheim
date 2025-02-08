import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Priority } from "@/types/character_types";
import { dico } from "@/types/dico";
import { Picker } from "@react-native-picker/picker";


interface PriorityFormProps {
  initialPriority?: Priority;
  onSubmit: (priority: Priority) => void;
  disabled: boolean;
}

const PriorityForm = ({ initialPriority, onSubmit, disabled }: PriorityFormProps) => {
  const [priority, setPriority] = useState<Priority>(
    initialPriority ?? { role: "A", attribute: "A", skills: "A", money: "A" }
  );

  useEffect(() => {
    setPriority(initialPriority ?? { role: "A", attribute: "A", skills: "A", money: "A" });
  }, [initialPriority]);

  console.log(priority);

  const handleChange = (name: string, value: string) => {
    const updatedPriority = { ...priority, [name]: value };
    setPriority(updatedPriority);
    onSubmit(updatedPriority);
  };

  const options = ["A", "B", "C", "D", "E"];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Priorités</Text>

      {Object.entries(priority).map(([key, value]) => (
        <View key={key} style={styles.inputGroup}>
          <Text style={styles.label}>{dico[key] ?? key}</Text>
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => handleChange(key, itemValue)}
            enabled={!disabled}
            style={styles.picker}
          >
            {options.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    opacity: 0.8,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});

export default PriorityForm;
