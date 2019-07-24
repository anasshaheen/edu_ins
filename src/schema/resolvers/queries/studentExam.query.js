const { ExamMark } = require('../../../db');

module.exports = {
  Query: {
    async examMarks(
      _,
      {
        paging: { page = 1, limit = 10 },
        examId
      }
    ) {
      return await ExamMark.find()
        .sort({
          createdAt: 'desc'
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .where({
          exam: examId
        })
        .populate('exam')
        .populate('student')
        .select();
    },
    async studentExamMarks(
      _,
      {
        paging: { page = 1, limit = 10 },
        studentId
      }
    ) {
      return await ExamMark.find()
        .sort({
          createdAt: 'desc'
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .where({
          student: studentId
        })
        .populate('exam')
        .select();
    },
    async examMark(_, { studentId, examId }) {
      return await ExamMark.findOne({
        student: studentId,
        exam: examId
      })
        .populate('exam')
        .select();
    }
  }
};
