import mongoose, { Schema, type Model } from "mongoose";
import type { IUser } from "../types/user.type.ts";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
