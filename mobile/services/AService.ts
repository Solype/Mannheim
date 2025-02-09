import AsyncStorage from '@react-native-async-storage/async-storage';

class HTTPError extends Error {
    constructor(message: string, public status: number, public statusText: string, public details: string | null) {
        super(message);
        this.name = 'HTTPError';
    }
}

class AService {
    private baseURL: string;
    private ip: string | null = "1";

    constructor() {
        this.init();
    }

    private async init() {
        if (typeof window !== 'undefined') {
            console.log('AsyncStorage is available in this environment.');
            this.ip = await AsyncStorage.getItem('ip');
        } else {
            console.warn('AsyncStorage is not available in this environment.');
        }
        this.baseURL = `http://${this.ip}:8080`;
    }
    
    protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, options);
            if (!response.ok) {
                throw new HTTPError('Network error', response.status, response.statusText, await response.text());
            }
            return await response.json();
        } catch (error) {
            console.error(`Error on ${endpoint}:`, error);
            throw error;
        }
    }

    protected async getHeaders(includeAuth: boolean = true): Promise<HeadersInit> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if (includeAuth) {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return headers;
    }
}

export default AService;
export { HTTPError };
