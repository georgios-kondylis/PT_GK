// userSchema.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: String, default: 'https://i.ibb.co/7NgPpZGk/default.png' },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for Google users
  review: {type: mongoose.Schema.Types.ObjectId, ref: 'Review'}
});

const User = mongoose.model("User", userSchema);

export default User;
