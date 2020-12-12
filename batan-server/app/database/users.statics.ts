import { IUserDocument, IUserModel } from "./users.types";

export async function findOneOrCreate(
    this: IUserModel,
    user: IUserDocument
): Promise<IUserDocument> {
    const record = await this.findOne({sub: user.sub});
    if(record) {
        return record;
    } else {
        return this.create(user);
    }
}

export async function findByEmail(
    this: IUserModel,
    email: string,
) : Promise<IUserDocument[]> {
    return this.find({email: email});
}

export async function findBySub(
    this: IUserModel,
    sub: string,
) : Promise<IUserDocument[]> {
    return this.find({sub: sub});
}