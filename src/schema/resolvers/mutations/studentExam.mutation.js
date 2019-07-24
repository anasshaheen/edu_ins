const { Exam, ExamMark } = require('../../../db');
const { responses } = require('../../../utils');

module.exports = {
  Mutation: {
    async addExamMarks(_, { examId, input }) {
      try {
        const exam = await Exam.findById(examId);
        if (!exam) {
          throw new Error('Exam not found!');
        }

        const studentIds = [];
        const examMarks = input.map(studentExam => {
          studentExam.exam = examId;
          studentIds.push(studentExam.student);

          return studentExam;
        });

        await ExamMark.insertMany(examMarks);

        return responses.addResponse('Exam Marks');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async updateExamMark(_, { input, examId }) {
      const examMark = await ExamMark.findOne({
        exam: examId,
        student: input.student
      });
      if (!examMark) {
        throw new Error('ExamMark not found!');
      }

      examMark.grade = input.grade;
      await examMark.save();

      return responses.updateResponse('ExamMark');
    },
    async removeExamMark(_, { examId, studentId }) {
      const examMark = await ExamMark.findOne({
        exam: examId,
        student: studentId
      });
      if (!examMark) {
        throw new Error('ExamMark not found!');
      }

      await examMark.remove();

      return responses.removeResponse('ExamMark');
    }
  }
};
