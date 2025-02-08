import AService from './AService';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginService extends AService {

    async login(username: string, password: string): Promise<string | null> {
        const headers = await this.getHeaders(false);

        const data = await this.request<string>('/login', {
            method: 'POST',
            headers,
            body: JSON.stringify({ username, password }),
        });

        await AsyncStorage.setItem('token', data);
        return data;
    }

    async register(username: string, password: string): Promise<string | null> {
        const headers = await this.getHeaders(false);

        const data = await this.request<string>('/register', {
            method: 'POST',
            headers,
            body: JSON.stringify({ username, password }),
        });
        await AsyncStorage.setItem('token', data);
        return data;
    }

    async whoami(): Promise<string | null> {
        const headers = await this.getHeaders();

        const data = await this.request<string>('/api/whoami', {
            method: 'GET',
            headers,
        });
        return data;
    }
}

export default new LoginService();
