import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  orderedItems: {
    type: [Number], // Array of numbers
    default: []
  }
});

const User = mongoose.model('User', userSchema);

export default User;
