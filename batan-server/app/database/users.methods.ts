import { Document } from "mongoose";
import { IGame } from "./games.types";
import { IUserDocument } from "./users.types";

export async function setNickname(this: IUserDocument, newName: string): Promise<void> {
    console.log(`Changing user ${this.firstName} ${this.lastName}'s nickname to ${newName}`);
    this.nickname = newName;
    this.save();
}

export async function removeAllUserData(this: IUserDocument): Promise<void> {
    console.log(`Deleting user ${this.firstName} ${this.lastName} from the database`);
    this.deleteOne();
}

export async function addGame(this: IUserDocument, game: IGame): Promise<void> {
    console.log(`Adding game ${game.gameName} to ${this.firstName} ${this.lastName}`);
    this.games.push(game);
    this.save();
}