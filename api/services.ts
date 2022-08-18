import axios from "axios";
import tokens from "./DB/DAOs/tokens.dao";

class Services {
    async listarRecursos() {
        return null
    }
    async listarClientes() {
        return null
    }
    async showToken() {
        return tokens.getToken();
    }
    async getNewToken(token: string): Promise<string> {
        const response = await axios.get(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`);
        if (!response.data.access_token) return token;
        return response.data.access_token;
    }
    async refreshMetaToken() {
        const oldToken = await tokens.getToken();
        if (!oldToken) return
        const newToken = await this.getNewToken(oldToken.token);
        if (!newToken) return
        await tokens.setNewToken(newToken);
    }
}

export default new Services;