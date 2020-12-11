import { IGameDocument, IGameModel } from "./games.types";

export async function findOneOrCreate(
    this: IGameModel,
    gameName: string
): Promise<IGameDocument> {
    const record = await this.findOne({gameName: gameName});
    if(record) {
        return record;
    } else {
        return this.create({gameId: 0, gameName: gameName, numPlayers: 0});
    }
}