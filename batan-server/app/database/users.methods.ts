import { Document } from "mongoose";
import { IUserDocument } from "./users.types";

export async function setNickname(this: IUserDocument): Promise<void> {
    //todo
}

export async function sameLastName(this: IUserDocument): Promise<Document[]> {
    return this.model("user").find({ lastName: this.lastName});
}
//todo add game to the user data
//todo request that all user data get removed