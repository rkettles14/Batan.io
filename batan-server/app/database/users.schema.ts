import { Schema } from "mongoose";
import { findOneOrCreate } from "./users.statics"
import { sameLastName } from "./users.methods"

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    nickname: String,
    //todo add completed games
});

UserSchema.statics.findOneOrCreate = findOneOrCreate;

UserSchema.methods.sameLastName = sameLastName;

export default UserSchema;