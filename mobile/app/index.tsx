import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginService from '@/services/LoginService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


const initialFormState = {
  username: '',
  password: '',
  ip: '',
};

export default function LoginPage() {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState<null | string>(null);
  const navigation = useNavigation();
  const router = useRouter();

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.password || !formData.ip) {
      setError('Please fill out all fields.');
      return;
    }

    await AsyncStorage.setItem('ip', formData.ip);

    try {
      await LoginService.login(formData.username, formData.password);
      router.push('/characters');
      // navigation.navigate('characters');
    } catch (error) {
      setError('Error logging in. Please try again.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/bg-login.png')} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <View style={styles.card}>
        <Text style={styles.header}>Login</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>IP</Text>
            <TextInput
              style={styles.input}
              placeholder="IP"
              value={formData.ip}
              onChangeText={value => handleChange('ip', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={formData.username}
              onChangeText={value => handleChange('username', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              secureTextEntry
              onChangeText={value => handleChange('password', value)}
            />
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Image source={require('@/assets/ring.png')} style={styles.icon} />
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={styles.registerLink}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.3,
  },
  card: {
    zIndex: 50,
    padding: 20,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#228B22',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#228B22',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  registerLink: {
    marginTop: 20,
    color: '#000',
    textDecorationLine: 'underline',
  },
});
