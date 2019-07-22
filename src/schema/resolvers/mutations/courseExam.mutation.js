const { Course } = require('../../../db');
const { responses } = require('../../../utils');

module.exports = {
  Mutation: {
    async addExam(_, { courseId, exam }) {
      try {
        const course = await Course.findById(courseId);
        if (!course) {
          throw new Error('Course not found!');
        }

        course.exams.push(exam);
        await course.save();

        return responses.addResponse('Exam');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async updateExam(_, { courseId, examId, exam }) {
      try {
        const course = await Course.findById(courseId);
        if (!course) {
          throw new Error('Course not found!');
        }

        await Course.updateOne(
          {
            'exams._id': examId
          },
          {
            $set: {
              'exams.$.name': exam.name,
              'exams.$.description': exam.description,
              'exams.$.grade': exam.grade
            }
          }
        );

        return responses.updateResponse('Exam');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async removeExam(_, { courseId, examId }) {
      try {
        const course = await Course.findById(courseId);
        if (!course) {
          throw new Error('Course not found!');
        }

        await Course.updateOne(
          {
            _id: courseId
          },
          {
            $pull: {
              exams: {
                _id: examId
              }
            }
          }
        );

        return responses.removeResponse('Exam');
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
