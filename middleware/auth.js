const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const token = req.header('Authorization');

  //Check for token
  if (!token) res.status(401).send('No token, Authorization denied')

  try {
    //Verify token
    const decoded = jwt.verify(token, config.get('jwt'))
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send(token + 'Token is not valid')
  }
}

module.exports = auth;
