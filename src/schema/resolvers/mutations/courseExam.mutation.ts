import { Course, Exam } from '../../../db';
import { responses } from '../../../utils';
import { IUser, IExam } from '../../../interfaces';

export default {
  Mutation: {
    async addExam(
      _: any,
      { courseId, input }: { courseId: string; input: IExam },
      { user: { _id } }: { user: IUser },
    ) {
      const course = <any>await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      input.course = courseId;
      input.createdAt = new Date();
      input.author = _id;
      const exam = new Exam(input);
      await exam.save();

      return responses.add('Exam');
    },
    async updateExam(
      _: any,
      { examId, input }: { examId: string; input: IExam },
    ) {
      const exam = <any>await Exam.findById(examId);
      if (!exam) {
        throw new Error('Exam not found!');
      }

      exam.name = input.name;
      exam.description = input.description;
      exam.grade = input.grade;
      await exam.save();

      return responses.update('Exam');
    },
    async removeExam(_: any, { examId }: { examId: string }) {
      const exam = await Exam.findById(examId);
      if (!exam) {
        throw new Error('Course not found!');
      }

      await exam.remove();

      return responses.remove('Exam');
    },
  },
};
