const jwt = require('jsonwebtoken');
const config = require('../../config');

const withAuth = function(req, res, next) {
  let token = req.headers['authorization'];
  if (!token || token.split(' ').length < 2) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    token = token.split(' ')[1];
    // console.log('token auth', token)
    jwt.verify(token, config.secrecKey, function(err, decoded) {
      if (err) {
        res.status(200).send({
          success: false,
          msg: 'Session timeout. Please re-login'
        });
      } else {
        req.body.email = decoded.email;
        next();
      }
    });
  }
}

module.exports = withAuth;