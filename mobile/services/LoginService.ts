import AService from './AService';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginService extends AService {

    async login(username: string, password: string): Promise<string | null> {
        const data = await this.request<string>('/login', {
            method: 'POST',
            headers: this.getHeaders(false), // Pas de token pour le login
            body: JSON.stringify({ username, password }),
        });
        await AsyncStorage.setItem('token', data);
        return data;
    }

    async register(username: string, password: string): Promise<string | null> {
        const data = await this.request<string>('/register', {
            method: 'POST',
            headers: this.getHeaders(false), // Pas de token pour le register
            body: JSON.stringify({ username, password }),
        });
        await AsyncStorage.setItem('token', data);
        return data;
    }

    async whoami(): Promise<string | null> {
        const data = await this.request<string>('/api/whoami', {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }
}

export default new LoginService();
