const jwt = require("jsonwebtoken");
require('dotenv').config()

const SECRET_TOKEN = process.env.TOKEN_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    console.log("No JWT Token Found");
    return res.sendStatus(401)
  }

  jwt.verify(token, SECRET_TOKEN, (err, user) => {
    if (err) {
      console.log("JWT Verify Error", err);
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}

function generateAccessToken(creds) {
  return jwt.sign(creds, SECRET_TOKEN, { expiresIn: '2d'});
}

module.exports = {authenticateToken, generateAccessToken};