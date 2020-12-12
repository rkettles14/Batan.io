import { Document, Model } from "mongoose";

export interface IUser {
    sub: string;        // The auth unique token
    firstName: string;
    lastName: string;
    email: string;
    nickname: string;
    //todo add
};

export interface IUserDocument extends IUser, Document {
    sameLastName: (this: IUserDocument) => Promise<Document[]>;
};

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