import { Document } from "mongoose";
import { IGameDocument } from "./games.types";

export async function sameGameName(this: IGameDocument): Promise<Document[]> {
    return this.model("game").find({gameName: this.gameName});
};

//todo add more as needed