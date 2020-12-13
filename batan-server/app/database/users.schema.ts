import { Schema } from "mongoose";
import { findByEmail, findOneOrCreate, findBySub, deleteUser } from "./users.statics"
import { addGame, removeAllUserData, setNickname } from "./users.methods"
import { IGame } from "./users.types"

const UserSchema = new Schema({
    sub: String,
    firstName: String,
    lastName: String,
    email: String,
    nickname: String,
    games: Array,
});

UserSchema.statics.findOneOrCreate = findOneOrCreate;
UserSchema.statics.deleteUser = deleteUser;
UserSchema.statics.findByEmail = findByEmail;
UserSchema.statics.findBySub = findBySub;

UserSchema.methods.addGame = addGame;
UserSchema.methods.setNickname = setNickname;
UserSchema.methods.removeAllUserData = removeAllUserData;

export default UserSchema;