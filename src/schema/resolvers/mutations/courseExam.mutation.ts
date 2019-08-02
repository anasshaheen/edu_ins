import { Course, Exam } from '../../../db';
import { responses } from '../../../utils';
import { IUser, IExam, IContextState } from '../../../interfaces';

export default {
  Mutation: {
    async addExam(
      _: object,
      { courseId, input }: { courseId: string; input: IExam },
      { user }: IContextState,
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      input.course = courseId;
      input.createdAt = new Date();
      input.author = (user as IUser)._id;
      const exam = new Exam(input);
      await exam.save();

      return responses.add('Exam');
    },
    async updateExam(
      _: object,
      { examId, input }: { examId: string; input: IExam },
    ) {
      const exam = await Exam.findById(examId);
      if (!exam) {
        throw new Error('Exam not found!');
      }

      await exam.updateOne({
        name: input.name,
        description: input.description,
        grade: input.grade,
      });

      return responses.update('Exam');
    },
    async removeExam(_: object, { examId }: { examId: string }) {
      const exam = await Exam.findById(examId);
      if (!exam) {
        throw new Error('Course not found!');
      }

      await exam.remove();

      return responses.remove('Exam');
    },
  },
};
