const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
 firstname: {
    type: String,
    required: true
 },
 lastname: {
     type: String
 },
 email: {
    type: String,
    required: true
 },
 phone: {
    type: String,
    required: true
 },
 subject: {
     type: String
 },
 message: {
     type: String,
     required: true
 },
 createdAt: {
    type: Date,
    default: Date.now()
  }
});
const User = mongoose.model("Contact", Schema);
module.exports = User;