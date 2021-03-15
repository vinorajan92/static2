const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
 mobile: {
    type: String
 },
 email:{
    type: String
 },
 product: {
   type: String,
   required: true
 },
 createdAt: {
   type: Date,
   default: Date.now()
 }
});
const Quote = mongoose.model("Quote", userSchema);
module.exports = Quote;