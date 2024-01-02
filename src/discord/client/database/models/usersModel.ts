import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
  _id: String,
  economy: {
    money: { type: Number, default: 0 },
  },
});

const User = model("users", UserSchema);
export default User;
