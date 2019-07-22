const { User, CourseStudent, Course } = require('../../../db');
const { roles } = require('../../../constants');
const { responses, hash } = require('../../../utils');

module.exports = {
  Mutation: {
    addStudent: async (_, { input: { phone, email, name, password } }) => {
      try {
        let user = await User.findOne({
          $or: [{ phone }, { email }]
        });
        if (user) {
          throw new Error('User is already exists!');
        }

        user = new User({
          name,
          email,
          phone,
          passowrd: await hash(password),
          role: roles.STUDENT,
          createdAt: new Date()
        });
        await user.save();

        const response = responses.addResponse('Student');
        response.id = user._id;

        return response;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async addStudentsToCourse(_, { courseId, students }) {
      try {
        if (!students.length) {
          throw new Error('Please, provide valid students');
        }

        const course = await Course.findById(courseId);
        if (!course) {
          throw new Error('Course not found!');
        }

        await CourseStudent.insertMany(
          students.map(studentId => ({
            student: studentId,
            course: courseId,
            enrollementDate: new Date()
          }))
        );

        return responses.addResponse('Course students');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async removeStudentsFromCourse(_, { courseId, students }) {
      try {
        if (!students.length) {
          throw new Error('Please, provide valid students');
        }

        const course = await Course.findById(courseId);
        if (!course) {
          throw new Error('Course not found!');
        }

        await CourseStudent.deleteMany({
          student: students,
          course: courseId
        });

        return responses.removeResponse('Course students');
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
