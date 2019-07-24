const { GeneralResource } = require('../../../db');

module.exports = {
  Query: {
    async generalResources(
      _,
      {
        paging: { page = 1, limit = 10 }
      }
    ) {
      const data = await GeneralResource.find()
        .sort({
          createdAt: 'desc'
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('user')
        .exec();

      return {
        data,
        page,
        limit,
        totalRecords: GeneralResource.countDocuments().exec()
      };
    },
    async generalResource(_, { id }) {
      return await GeneralResource.findById(id).populate('user');
    }
  }
};
