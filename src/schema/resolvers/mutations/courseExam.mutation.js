const { Course, Exam } = require('../../../db');
const { responses } = require('../../../utils');

module.exports = {
  Mutation: {
    async addExam(
      _,
      { courseId, input },
      {
        user: { _id }
      }
    ) {
      try {
        const course = await Course.findById(courseId);
        if (!course) {
          throw new Error('Course not found!');
        }

        input.course = courseId;
        input.createdAt = new Date();
        input.author = _id;
        const exam = new Exam(input);
        await exam.save();

        return responses.addResponse('Exam');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async updateExam(_, { examId, input }) {
      try {
        const exam = await Exam.findById(examId);
        if (!exam) {
          throw new Error('Exam not found!');
        }

        exam.name = input.name;
        exam.description = input.description;
        exam.grade = input.grade;
        await exam.save();

        return responses.updateResponse('Exam');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async removeExam(_, { examId }) {
      try {
        const exam = await Exam.findById(examId);
        if (!exam) {
          throw new Error('Course not found!');
        }

        await exam.remove();

        return responses.removeResponse('Exam');
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
