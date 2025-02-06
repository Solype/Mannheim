import AsyncStorage from '@react-native-async-storage/async-storage';

class HTTPError extends Error {
    constructor(message: string, public status: number, public statusText: string, public details: string | null) {
        super(message);
        this.name = 'HTTPError';
    }
}

class AService {
    private baseURL: string;

    constructor() {
        // this.baseURL = __DOCKER_HOST_IP__ ? `http://${__DOCKER_HOST_IP__}:8080` : `http://${__MY_LOCAL_IP__}:8080`;
        this.baseURL = `http://10.116.120.100:8080`;
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
