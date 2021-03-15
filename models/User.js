const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
 username: {
    type: String,
    unique: true,
    required: true
 },
 password: {
     type: String,
     required: true
 },
 createdAt: {
    type: Date,
    default: Date.now()
  }
});
const User = mongoose.model("User", Schema);
module.exports = User;