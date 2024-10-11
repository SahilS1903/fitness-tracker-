const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  profileImage: {
    type: String,
    default: '',
  },
  height: {
    type: Number,
    default: null,
  },
  weight: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);

