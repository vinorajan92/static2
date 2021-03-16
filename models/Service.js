const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
 name:{
    type: String,
    unique: true,
    required:true
 },
 message:{
    type: String,
    required:true
 },
 createdAt: {
   type: Date,
   default: Date.now()
 }
});
const Quote = mongoose.model("Service", userSchema);
module.exports = Quote;