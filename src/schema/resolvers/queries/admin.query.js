const { User } = require('../../../db');

const { roles } = require('../../../constants');

module.exports = {
  Query: {
    admins: async () => {
      return await User.find({
        role: roles.ADMIN
      });
    }
  }
};
