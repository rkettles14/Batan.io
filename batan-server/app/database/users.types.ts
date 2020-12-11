import { Document, Model } from "mongoose";

export interface IUser {
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
            firstName,
            lastName,
            email,
            nickname
        }: { firstName: string; lastName: string; email: string; nickname: string; }
    ) => Promise<IUserDocument>;
};