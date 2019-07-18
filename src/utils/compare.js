const bcrypt = require('bcrypt');

module.exports = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
