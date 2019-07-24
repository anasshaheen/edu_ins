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
      const data = await ExamMark.find()
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

      return {
        data,
        page,
        limit,
        totalRecords: await ExamMark.countDocuments({
          exam: examId
        }).exec()
      };
    },
    async studentExamMarks(
      _,
      {
        paging: { page = 1, limit = 10 },
        studentId
      }
    ) {
      const data = await ExamMark.find()
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

      return {
        data,
        page,
        limit,
        totalRecords: await ExamMark.countDocuments({
          student: studentId
        }).exec()
      };
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
