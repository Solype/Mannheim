import AService from './AService';

class UtilsService extends AService {

    async getUserIdByName(userName: string): Promise<number> {
        return await this.request<number>(`/api/users/${userName}`, {
                method: 'GET',
                headers: this.getHeaders(),
            }
        );
    }

    async getCharacterIdByName(characterName: string): Promise<number> {
        console.log("++++++++++++++++++++++++++++++++++++++++++" + characterName);
        return await this.request<number>(`/api/characters/${characterName}`, {
                method: 'GET',
                headers: this.getHeaders(),
            }
        );
    }
}

export default new UtilsService();
