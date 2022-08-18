import { Schema, model } from 'mongoose';

interface IToken {
    token: string;
}

const tokenSchema = new Schema<IToken>({
    token: { type: String, required: true },
});

const Token = model<IToken>('Token', tokenSchema);

export default Token;