const { GeneralResource } = require('../../../db');

module.exports = {
  Query: {
    async generalResources(
      _,
      {
        paging: { page = 1, limit = 10 }
      }
    ) {
      return await GeneralResource.find()
        .sort({
          createdAt: 'desc'
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('user')
        .exec();
    },
    async generalResource(_, { id }) {
      return await GeneralResource.findById(id).populate('user');
    }
  }
};
