import { Document, Model } from "mongoose";

export interface IGame {
    gameId: number;
    date: number;               //utc date from Date.now() as it will likely be used
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

export interface IUser {
    sub: string;        // The auth unique token
    firstName: string;
    lastName: string;
    email: string;
    nickname: string;
    games: [IGame];
};

export interface IUserDocument extends IUser, Document {
    setNickname: (this: IUserDocument, name: string) => Promise<void>;
    removeAllUserData(this: IUserDocument): Promise<void>;
    addGame(this: IUserDocument, game: IGame): Promise<void>;
};

/**
 * This is the interface that you can call from the db object which is
 *  returned from the connect() function in database/index.ts
 */
export interface IUserModel extends Model<IUserDocument> {
    findOneOrCreate: (
        this: IUserModel,
        {
            sub,
            firstName,
            lastName,
            email,
            nickname
        }: { sub: string, firstName: string; lastName: string; email: string; nickname: string; }
    ) => Promise<IUserDocument>;

    findBySub: (
        this: IUserModel,
        sub_token: string,
    ) => Promise<IUserDocument>;

    findByEmail: (
        this: IUserModel,
        email_address: string,
    ) => Promise<IUserDocument>;
};