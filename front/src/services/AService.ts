class HTTPError extends Error {
    constructor(message: string, public status: number, public statusText: string, public details: string | null) {
        super(message);
        this.name = 'HTTPError';
    }
}

class AService {
    private baseURL: string;

    constructor() {
        this.baseURL = __DOCKER_HOST_IP__ ? `http://${__DOCKER_HOST_IP__}:8080` : `http://${__MY_LOCAL_IP__}:8080`;
    }

    protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, options);
            if (!response.ok) {
                throw new HTTPError('Erreur réseau', response.status, response.statusText, await response.text());
            }
            return await response.json();
        } catch (error) {
            console.error(`Erreur sur ${endpoint}:`, error);
            throw error;
        }
    }

    protected getHeaders(includeAuth: boolean = true): HeadersInit {
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
}

export default AService;
export { HTTPError };
