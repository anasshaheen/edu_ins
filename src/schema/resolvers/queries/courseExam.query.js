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
      return await Exam.find({
        course: courseId
      })
        .sort({
          createdAt: 'desc'
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('author')
        .exec();
    },
    async courseExam(_, { id }) {
      return await Exam.findById(id).populate('author');
    }
  }
};
