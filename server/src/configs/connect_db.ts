import mongoose, { ConnectOptions } from "mongoose";

const connect_db = async (user: string, password: string) => {
    console.log("see them", user, password);
    let dbUri = `mongodb+srv://${user}:${password}@cluster0.kbckoa9.mongodb.net/?retryWrites=true&w=majority`;

    try {
        mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
        console.log("Connected successfully with Database.")
    } catch (error) {
        console.log("connection faild...");
    }
}

export default connect_db;