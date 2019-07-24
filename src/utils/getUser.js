const { User } = require('../db');

module.exports = async email => {
  const user = await User.findOne({ email });
  if (!user) {
    return { user: undefined, isLoggedIn: false };
  }

  return { user, isLoggedIn: true };
};
