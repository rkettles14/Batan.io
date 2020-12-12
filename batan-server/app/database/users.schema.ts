import { Schema } from "mongoose";
import { findByEmail, findOneOrCreate, findBySub } from "./users.statics"
import { sameLastName } from "./users.methods"

const UserSchema = new Schema({
    sub: String,
    firstName: String,
    lastName: String,
    email: String,
    nickname: String,
    //todo add completed games
});

UserSchema.statics.findOneOrCreate = findOneOrCreate;
UserSchema.statics.findByEmail = findByEmail;
UserSchema.statics.findBySub = findBySub;

UserSchema.methods.sameLastName = sameLastName;

export default UserSchema;