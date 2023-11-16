import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  profileImage: {
    type: String,
    default: "images/default.png",
  },
  password: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
