

class LoginService {
    private baseURL = __DOCKER_HOST_IP__ ? `http://${__DOCKER_HOST_IP__}:8080` : `http://${__MY_LOCAL_IP__}:8080`;


    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, options);
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            return await response.json();
        } catch (error) {
            console.error(`Erreur sur ${endpoint}:`, error);
            throw error;
        }
    }
    private getHeaders(includeAuth: boolean = true): HeadersInit {
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
            };
            if (includeAuth) {
                const token = localStorage.getItem('token');
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
            }
            return headers;
    }

    async login(username: string, password: string): Promise<string | null> {
        const data = await this.request<string>('/login', {
            method: 'POST',
            headers: this.getHeaders(false), // Pas de token pour le login
            body: JSON.stringify({ username, password }),
        });
        localStorage.setItem('token', data);
        return data;
    }

    async register(username: string, password: string): Promise<string | null> {
        const data = await this.request<string>('/register', {
            method: 'POST',
            headers: this.getHeaders(false), // Pas de token pour le register
            body: JSON.stringify({ username, password }),
        });
        localStorage.setItem('token', data);
        return data;
    }
}

export default new LoginService();
