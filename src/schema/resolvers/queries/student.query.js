const { User } = require('../../../db');

const { roles } = require('../../../constants');

module.exports = {
  Query: {
    async students(
      _,
      {
        paging: { page = 1, limit = 10 }
      }
    ) {
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
    },
    async searchForStudent(
      _,
      {
        paging: { page = 1, limit = 10 },
        query
      }
    ) {
      return await User.find()
        .sort({
          createdAt: 'desc'
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .where({
          $or: [
            { phone: new RegExp(query, 'i') },
            { name: new RegExp(query, 'i') }
          ],
          $and: [{ role: roles.STUDENT }]
        })
        .select();
    }
  }
};
