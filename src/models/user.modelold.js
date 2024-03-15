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

export default mongoose.model("cadastro/user", userSchema);

//   username: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// },