import { Document, Model } from "mongoose";

export interface IGame {
    gameId: number;
    gameName: string;
    numPlayers: number;
};

export interface IGameDocument extends IGame, Document {
    sameGameId: (this: IGameDocument) => Promise<Document[]>;
};

export interface IGameModel extends Model<IGameDocument> {
    findOneOrCreate: (
        this: IGameModel,
        {
            gameId,
            gameName,
            numPlayers,
        }: {gameId: number; gameName: string; numPlayers: number;}
    ) => Promise<IGameDocument>;
};