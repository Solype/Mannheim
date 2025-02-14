import AService from "@/services/AService";
import { SessionShort, Pawn, Note } from "@/types/sesssion_types";

class SessionService extends AService {
    public async getAllSessions(): Promise<SessionShort[]> {
        return await this.request<SessionShort[]>('/api/my/sessions', {
                method: 'GET',
                headers: this.getHeaders(),
            }
        );
    }

    public async getMySession(): Promise<SessionShort[]> {
        return await this.request<SessionShort[]>('/api/my/owned/sessions', {
                method: 'GET',
                headers: this.getHeaders(),
            }
        );
    }

    public async getRoom(sessionId: string): Promise<SessionShort> {
        return await this.request<SessionShort>(`/api/my/session/${sessionId}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }

    public async createSession(name : string, description : string): Promise<SessionShort> {
        return await this.request<SessionShort>('/api/my/session', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ name, description }),
        });
    }

    public async deleteSession(sessionId: number): Promise<SessionShort> {
        return await this.request<SessionShort>(`/api/my/session/${sessionId}`, {
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

    public async getPawns(sessionId: string, isGm: boolean): Promise<Pawn[]> {
        return await this.request<Pawn[]>(`/api/my/session/${sessionId}/pawns/${isGm}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }

    public async deletePawn(sessionId: string, pawnId: number): Promise<void> {
        return await this.request<void>(`/api/my/session/${sessionId}/pawn/${pawnId}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
    }

    public async getNotes(sessionId: string): Promise<Note[]> {
        return await this.request<Note[]>(`/api/my/session/${sessionId}/notes`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }

    public async createNote(sessionId: string, note: string): Promise<void> {
        return await this.request<void>(`/api/my/session/${sessionId}/notes`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ content : note }),
        });
    }

    public async deleteNote(sessionId: string, noteId: number): Promise<void> {
        return await this.request<void>(`/api/my/session/${sessionId}/notes/${noteId}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
    }

    public async updateNote(sessionId: string, noteId: number, note: string): Promise<void> {
        return await this.request<void>(`/api/my/session/${sessionId}/notes/${noteId}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ content : note }),
        });
    }
}

const sessionService = new SessionService();
export default sessionService;
