const { User } = require('../../../db');

const { roles } = require('../../../constants');

module.exports = {
  Query: {
    students: async (_, { paging: { page = 1, limit = 10 } }) => {
      return await User.find()
        .sort({
          createdAt: 'desc'
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .where({
          role: roles.STUDENT
        })
        .select();
    }
  }
};
