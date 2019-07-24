const { Exam } = require('../../../db');

module.exports = {
  Query: {
    async courseExams(
      _,
      {
        paging: { page = 1, limit = 10 },
        courseId
      }
    ) {
      const data = await Exam.find({
        course: courseId
      })
        .sort({
          createdAt: 'desc'
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('author')
        .exec();

      return {
        data,
        page,
        limit,
        totalRecords: await Exam.countDocuments({
          course: courseId
        }).exec()
      };
    },
    async courseExam(_, { id }) {
      return await Exam.findById(id).populate('author');
    }
  }
};
