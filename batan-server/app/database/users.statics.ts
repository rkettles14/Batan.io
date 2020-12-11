import { IUserDocument, IUserModel } from "./users.types";

export async function findOneOrCreate(
    this: IUserModel,
    userEmail: string
): Promise<IUserDocument> {
    const record = await this.findOne({ email: userEmail});
    if(record) {
        return record;
    } else {
        return this.create({firstName: "", lastName: "", email: userEmail, nickname: "",});
    }
}

export async function findByEmail(
    this: IUserModel,
    email: string,
) : Promise<IUserDocument[]> {
    return this.find({email: email});
}