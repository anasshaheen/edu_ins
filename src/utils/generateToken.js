const jwt = require('jsonwebtoken');

const { jsonWebToken } = require('../config');

module.exports = payload => {
  return jwt.sign(payload, jsonWebToken.privateKey, jsonWebToken.options);
};
