import { ExamMark } from '../../../db';
import { IPaging } from '../../../interfaces';

export default {
  Query: {
    async examMarks(
      _: object,
      {
        paging: { page = 1, limit = 10 },
        examId,
      }: { paging: IPaging; examId: string },
    ) {
      const data = await ExamMark.find()
        .sort({
          createdAt: 'desc',
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .where({
          exam: examId,
        })
        .populate('exam')
        .populate('student')
        .exec();

      return {
        data,
        page,
        limit,
        totalRecords: await ExamMark.countDocuments({
          exam: examId,
        }).exec(),
      };
    },
    async studentExamMarks(
      _: object,
      {
        paging: { page = 1, limit = 10 },
        studentId,
      }: { paging: IPaging; studentId: string },
    ) {
      const data = await ExamMark.find()
        .sort({
          createdAt: 'desc',
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .where({
          student: studentId,
        })
        .populate('exam')
        .exec();

      return {
        data,
        page,
        limit,
        totalRecords: await ExamMark.countDocuments({
          student: studentId,
        }).exec(),
      };
    },
    async examMark(
      _: object,
      { studentId, examId }: { studentId: string; examId: string },
    ) {
      return await ExamMark.findOne({
        student: studentId,
        exam: examId,
      })
        .populate('exam')
        .exec();
    },
  },
};
