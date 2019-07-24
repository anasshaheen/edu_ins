const verifyToken = require('./verifyToken');
const decodeToken = require('./decodeToken');
const getUser = require('./getUser');

module.exports = async token => {
  if (!verifyToken(token)) {
    return { user: undefined, isLoggedIn: false };
  }

  const {
    payload: { email }
  } = decodeToken(token);

  return await getUser(email);
};
