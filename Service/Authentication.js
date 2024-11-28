const JWT = require('jsonwebtoken')

const superKey = "SFQR!#$ESAD";

function createToken(user){
  const payload = {
    id: user._id,
    name: user.name,
    email:user.email,
    profileImageURL: user.profileImageURL,
    role:user.role,
  }

  const token = JWT.sign(payload,superKey);
  return token;
}

function validateToken(token){
  const payload = JWT.verify(token,superKey);
  return payload;
}


module.exports = {
  createToken,validateToken
}