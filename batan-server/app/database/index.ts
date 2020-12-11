import Mongoose = require("mongoose");
import config from "../config";

let database: Mongoose.Connection;

export const connect = () => {
    const uri = `mongodb+srv://${config.db_username}:${config.db_password}@cluster0.5f5vl.mongodb.net/batan`;
    if(database) {
        return;
    }

    Mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    database = Mongoose.connection;

    database.once("open", async () => {
        console.log("Connected to database");
    });

    database.on("error", () => {
        console.log("Error connecting to database");
    });
}

export const disconnect = () => {
    if(!database) {
        return;
    }

    Mongoose.disconnect();
}