import AService from "@/services/AService";
import { SessionShort } from "@/types/sesssion_types";


class SessionService extends AService {
    public async getAllSessions(): Promise<SessionShort[]> {
        const headers = await this.getHeaders();

        return await this.request<SessionShort[]>('/api/my/sessions', {
                method: 'GET',
                headers,
            }
        );
    }

    public async getMySession(): Promise<SessionShort> {
        const headers = await this.getHeaders();

        return await this.request<SessionShort>('/api/my/owned/sessions', {
                method: 'GET',
                headers,
            }
        );
    }

    public async getRoom(sessionId: string): Promise<SessionShort> {
        const headers = await this.getHeaders();

        return await this.request<SessionShort>(`/api/my/session/${sessionId}`, {
            method: 'GET',
            headers,
        });
    }

    public async createSession(name : string, description : string): Promise<SessionShort> {
        const headers = await this.getHeaders();

        return await this.request<SessionShort>('/api/my/session', {
            method: 'POST',
            headers,
            body: JSON.stringify({ name, description }),
        });
    }

    public async deleteSession(sessionId: number): Promise<SessionShort> {
        const headers = await this.getHeaders();

        return await this.request<SessionShort>(`/api/my/session/${sessionId}`, {
            method: 'DELETE',
            headers,
        });
    }

    public async updateSession(sessionId: string, session: SessionShort): Promise<void> {
        const headers = await this.getHeaders();

        return await this.request<void>(`/api/my/session/${sessionId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(session),
        });
    }
}

const sessionService = new SessionService();
export default sessionService;
