const bcrypt = require('bcrypt');

module.exports = async password => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
