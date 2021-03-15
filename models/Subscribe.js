const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
 email:{
    type: String,
    unique: true,
    required:true
 },
 createdAt: {
   type: Date,
   default: Date.now()
 }
});
const Quote = mongoose.model("Subscribe", userSchema);
module.exports = Quote;