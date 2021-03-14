var nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.zoho.in",
       auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
         },
    secure: true,
});

module.exports = transporter;