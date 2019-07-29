import { Exam, ExamMark } from '../../../db';
import { responses } from '../../../utils';
import { IExamMark } from '../../../interfaces';

export default {
  Mutation: {
    async addExamMarks(
      _: any,
      { examId, input }: { examId: string; input: [Partial<IExamMark>] },
    ) {
      const exam = await Exam.findById(examId);
      if (!exam) {
        throw new Error('Exam not found!');
      }

      const examMarks = input.map(studentExam => {
        studentExam.exam = examId;
        return studentExam;
      });

      await ExamMark.insertMany(examMarks);

      return responses.add('Exam Marks');
    },
    async updateExamMark(
      _: any,
      { input, examId }: { input: IExamMark; examId: string },
    ) {
      const examMark = <any>await ExamMark.findOne({
        exam: examId,
        student: input.student,
      });
      if (!examMark) {
        throw new Error('ExamMark not found!');
      }

      examMark.grade = input.grade;
      await examMark.save();

      return responses.update('ExamMark');
    },
    async removeExamMark(
      _: any,
      { examId, studentId }: { examId: string; studentId: string },
    ) {
      const examMark = await ExamMark.findOne({
        exam: examId,
        student: studentId,
      });
      if (!examMark) {
        throw new Error('ExamMark not found!');
      }

      await examMark.remove();

      return responses.remove('ExamMark');
    },
  },
};
