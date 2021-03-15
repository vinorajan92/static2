const mongoose = require("mongoose");
var nodemailer = require('nodemailer');
require('dotenv').config()

const connectDb = () => {
    console.log('Connecting to the DB:',process.env.DB_URL);
    return mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
};

const transporter = nodemailer.createTransport({
    port: process.env.EMAIL_SMPTP_PORT,
    host: process.env.EMAIL_SMPTP_HOST,
       auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
         },
    secure: true,
});


module.exports = {connectDb, transporter};