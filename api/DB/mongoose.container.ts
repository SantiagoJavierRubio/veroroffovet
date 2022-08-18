import { connect, disconnect } from "mongoose";

export default class Mongoose {
    async connect() {
        await connect("mongodb://127.0.0.1:27017/test")
        .then(() => {
            console.log(`Mongoose connected`);
        })
        .catch(err => {
            console.log(err);
        });
    }
    async disconnect() {
        await disconnect().then(() => {
            console.log(`Mongoose disconnected`);
        }).catch((err) => {
            console.log(err);
        });
    }
}