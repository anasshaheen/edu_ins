const jwt = require('jsonwebtoken');

module.exports = token => {
  return jwt.decode(token, { complete: true });
};
