import { model } from "mongoose";
import { IGameDocument } from "./games.types";
import GameSchema from "./games.schema";

export const GameModel = model<IGameDocument>("game", GameSchema);