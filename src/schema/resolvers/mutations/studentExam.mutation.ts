import { Exam, ExamMark } from '../../../db';
import { responses } from '../../../utils';
import { IExamMark } from '../../../interfaces';

export default {
  Mutation: {
    async addExamMarks(
      _: object,
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
      _: object,
      { input, examId }: { input: IExamMark; examId: string },
    ) {
      const examMark = await ExamMark.findOne({
        exam: examId,
        student: input.student,
      });
      if (!examMark) {
        throw new Error('ExamMark not found!');
      }

      await examMark.updateOne({
        grade: input.grade,
      });

      return responses.update('ExamMark');
    },
    async removeExamMark(
      _: object,
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
