import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";

interface ListStringFormProps {
  title: string;
  listString: string[];
  setter: (roles: string[]) => void;
  disabled: boolean;
}

const ListStringForm = ({ title, listString, setter, disabled }: ListStringFormProps) => {
  const [inputValue, setInputValue] = useState("");

  const addRole = () => {
    if (inputValue.trim() === "") return;

    setter([...listString, inputValue]);
    setInputValue("");
  };

  const removeRole = (index: number) => {
    const updatedRoles = listString.filter((_, i) => i !== index);
    setter(updatedRoles);
  };

  return (
        <FlatList
          ListHeaderComponent={
            <View style={styles.container}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter a role"
                  value={inputValue}
                  onChangeText={setInputValue}
                  editable={!disabled}
                />
                {!disabled && (
                  <TouchableOpacity onPress={addRole} style={styles.button}>
                    <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          }
          data={listString}
          renderItem={({ item, index }) => (
            <View style={styles.roleContainer}>
              <Text>{item}</Text>
              {!disabled && (
                <TouchableOpacity onPress={() => removeRole(index)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        /> 
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginBottom: 10,
  },
  removeText: {
    color: "#E74C3C",
    fontWeight: "bold",
  },
});

export default ListStringForm;
