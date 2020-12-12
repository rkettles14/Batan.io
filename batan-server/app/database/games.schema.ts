import { Schema } from "mongoose";
import { findAllUsersGames } from "./games.statics";
import { sameGameName } from "./games.methods"

const GameSchema = new Schema({
    _player: { type: Schema.Types.ObjectId, ref: 'user'},
    gameId: Number,
    date: Date,
    gameName: String,
    numPlayers: Number,
    playerWon: Boolean,
    playerSettlements: Number,
    playerCities: Number,
    playerRoads: Number,
    playerResourceCards: Number,
    playerVictoryPoints: Number,
    playerLargestArmy: Boolean,
    playerLongestRoad: Boolean
});

//todo add statics and methods
GameSchema.methods.findAllUsersGames = findAllUsersGames;
GameSchema.methods.sameGameName = sameGameName;

export default GameSchema;