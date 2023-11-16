import mongoose from "mongoose";

export const bookSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Book = mongoose.model("Book", bookSchema);
