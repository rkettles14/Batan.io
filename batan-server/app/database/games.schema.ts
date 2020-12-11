import { Schema } from "mongoose";
import { findOneOrCreate } from "./games.statics";
import { sameGameName } from "./games.methods"

const GameSchema = new Schema({
    gameId: Number,
    gameName: String,
    numPlayers: Number
    //todo add other game details
});

//todo add statics and methods
GameSchema.statics.findOneOrCreate = findOneOrCreate;

GameSchema.methods.sameGameName = sameGameName;

export default GameSchema;