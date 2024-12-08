import AService from "@/services/AService";
import { SessionShort } from "@/types/sesssion_types";

class SessionService extends AService {
    public async getAllSessions(): Promise<SessionShort[]> {
        return await this.request<SessionShort[]>('/api/my/sessions', {
                method: 'GET',
                headers: this.getHeaders(),
            }
        );
    }

    public async getMySession(): Promise<SessionShort> {
        return await this.request<SessionShort>('/api/my/owned/sessions', {
                method: 'GET',
                headers: this.getHeaders(),
            }
        );
    }

    public async createSession(session: SessionShort): Promise<void> {
        return await this.request<void>('/api/my/session', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(session),
        });
    }

    public async deleteSession(sessionId: string): Promise<void> {
        return await this.request<void>(`/api/my/session/${sessionId}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
    }

    public async updateSession(sessionId: string, session: SessionShort): Promise<void> {
        return await this.request<void>(`/api/my/session/${sessionId}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(session),
        });
    }
}

const sessionService = new SessionService();
export default sessionService;
