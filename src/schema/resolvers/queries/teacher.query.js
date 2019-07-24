const { User } = require('../../../db');

const { roles } = require('../../../constants');

module.exports = {
  Query: {
    teachers: async (_, { paging: { page = 1, limit = 10 } }) => {
      const data = await User.find()
        .sort({
          createdAt: 'desc'
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .where({
          role: roles.TEACHER
        });

      return {
        data,
        page,
        limit,
        totalRecords: await User.countDocuments({
          role: roles.TEACHER
        }).exec()
      };
    }
  }
};
