import { User, CourseStudent, Course } from '../../../db';
import { roles } from '../../../constants';
import { responses, HashUtils } from '../../../utils';
import { IUser } from '../../../interfaces';

export default {
  Mutation: {
    addStudent: async (_: object, { input }: { input: IUser }) => {
      const user = await User.findOne({
        $or: [{ phone: input.phone }, { email: input.email }],
      });
      if (user) {
        throw new Error('User is already exists!');
      }

      await User.create({
        name: input.name,
        email: input.email,
        phone: input.phone,
        password: await HashUtils.hashPass(input.password),
        role: roles.STUDENT,
        createdAt: new Date(),
      });

      return responses.add('Student');
    },
    async addStudentsToCourse(
      _: object,
      { courseId, students }: { courseId: string; students: [string] },
    ) {
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
          enrollementDate: new Date(),
        })),
      );

      return responses.add('Course students');
    },
    async removeStudentsFromCourse(
      _: object,
      { courseId, students }: { courseId: string; students: [string] },
    ) {
      if (!students.length) {
        throw new Error('Please, provide valid students');
      }

      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      await CourseStudent.deleteMany({
        student: students,
        course: courseId,
      });

      return responses.remove('Course students');
    },
  },
};
