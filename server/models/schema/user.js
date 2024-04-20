const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
// });

// exports.User = mongoose.model("User", UserSchema);

module.exports = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);