import Mongoose = require("mongoose");
import config from "../config";
import { UserModel } from "./users.model"

let database: Mongoose.Connection;

export const connectAndDo = (operation: any) => {
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
        await operation({UserModel});
        disconnect();
    });

    database.on("error", () => {
        console.log("Error connecting to database");
        disconnect();
    });
}

const disconnect = () => {
    if(!database) {
        return;
    }

    Mongoose.disconnect();
    console.log("Disconnected from database");
}