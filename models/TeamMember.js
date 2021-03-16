const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
 name: {
    type: String,
    unique: true,
    required: true
 },
 role: {
     type: String,
     required: true
 },
 message: {
    type: String,
 },
 socialLinks: [{
    service: String,
    url: String
 }],
 createdAt: {
    type: Date,
    default: Date.now()
  }
});
const User = mongoose.model("TeamMember", Schema);
module.exports = User;