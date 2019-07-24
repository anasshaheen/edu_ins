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
      const data = await User.find()
        .sort({
          createdAt: 'desc'
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .where({
          role: roles.STUDENT
        })
        .select();

      return {
        data,
        page,
        limit,
        totalRecords: await User.countDocuments({
          role: roles.STUDENT
        }).exec()
      };
    },
    async searchForStudent(
      _,
      {
        paging: { page = 1, limit = 10 },
        query
      }
    ) {
      const data = await User.find()
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

      return {
        data,
        page,
        limit,
        totalRecords: await User.countDocuments({
          $or: [
            { phone: new RegExp(query, 'i') },
            { name: new RegExp(query, 'i') }
          ],
          $and: [{ role: roles.STUDENT }]
        }).exec()
      };
    }
  }
};
