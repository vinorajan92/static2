const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
 name:{
    type: String,
    required:true
 },
 message:{
    type: String,
    required:true
 },
 source: String,
 createdAt: {
   type: Date,
   default: Date.now()
 }
});
const Quote = mongoose.model("Client", userSchema);
module.exports = Quote;