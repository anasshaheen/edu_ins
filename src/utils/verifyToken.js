const jwt = require('jsonwebtoken');

const { jsonWebToken } = require('../config');

module.exports = token => {
  return jwt.verify(
    token,
    jsonWebToken.privateKey,
    jsonWebToken.options,
    err => {
      if (err) {
        return false;
      } else {
        return true;
      }
    }
  );
};
