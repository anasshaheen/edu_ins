import { Exam } from '../../../db';
import { IPaging } from '../../../interfaces';

export default {
  Query: {
    async courseExams(
      _: any,
      {
        paging: { page = 1, limit = 10 },
        courseId,
      }: { paging: IPaging; courseId: string },
    ) {
      const data = await Exam.find({
        course: courseId,
      })
        .sort({
          createdAt: 'desc',
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('author')
        .exec();

      return {
        data,
        page,
        limit,
        totalRecords: await Exam.countDocuments({
          course: courseId,
        }).exec(),
      };
    },
    async courseExam(_: any, { id }: { id: string }) {
      return await Exam.findById(id).populate('author');
    },
  },
};
