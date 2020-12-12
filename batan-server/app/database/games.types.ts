import { Document, Model } from "mongoose";

/**
 * This is the game statistics that should be saved when the game is
 *  done for each player. These stats shouldn't contain any information
 *  about the other players so that deleting all the user's information
 *  is made much easier.
 */
export interface IGame {
    gameId: number;
    date: Date;
    gameName: string;
    numPlayers: number;
    playerWon: boolean;
    playerSettlements: number;
    playerCities: number;
    playerRoads: number;
    playerResourceCards: number;
    playerVictoryPoints: number;
    playerLargestArmy: boolean;
    playerLongestRoad: boolean;
};

export interface IGameDocument extends IGame, Document {
    sameGameId: (this: IGameDocument) => Promise<Document[]>;
};

export interface IGameModel extends Model<IGameDocument> {
};