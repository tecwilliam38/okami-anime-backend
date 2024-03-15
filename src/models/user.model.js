import mongoose from "mongoose";

const ObjectId = mongoose.Schema.ObjectId;

const userSchema = new mongoose.Schema(
  {
    id: ObjectId,
    user_name: String,
    user_email: String,
    user_birthday: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("cadastro/user", userSchema);

export default User;