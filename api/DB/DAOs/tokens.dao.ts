import Token from "../Models/token.model";
import Container from "../mongoose.container";

class TokenDAO extends Container {
    constructor() {
        super();
    }
    async getToken() {
        await this.connect();
        const token = await Token.findOne();
        await this.disconnect();
        return token;
    }
    async setNewToken(token: string) {
        await this.connect();
        await Token.deleteMany({});
        const newToken = new Token({ token });
        await newToken.save();
        await this.disconnect();
    }
}

const tokens = new TokenDAO();
export default tokens;