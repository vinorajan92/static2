var { transporter } = require('./connection');

function sendMail(mailData, res) {
    transporter.sendMail(mailData, function (err, info) {
        if(err)
            console.log("Sending Mail Failure :", err);
    });
}

module.exports = {sendMail}