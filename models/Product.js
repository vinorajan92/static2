const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
 productName: {
    type: String,
    unique: true,
    required: true
 },
 thumbnailImage: {
     type: String,
     required: true
 },
 productImages: [{
     type: String,
     required: true
 }],
 bannerImage: {
     type: String,
     required: true
 },
 price: String,
 shortDescription: String,
 descriptions: [{
     type: String,
     required: true
 }],
 specifications: [{
    type: String
 }],
 createdAt: {
    type: Date,
    default: Date.now()
  }
});
const User = mongoose.model("Product", Schema);
module.exports = User;