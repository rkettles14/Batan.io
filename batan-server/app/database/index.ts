import Mongoose = require("mongoose");
import config from "../config";

let database: Mongoose.Connection;

export const connect = () => {
    if(database) {
        return;
    }
    if(config.db_uri === undefined){
        console.error("Missing database connection string in .env");
        return;
    }

    Mongoose.connect(config.db_uri, {
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