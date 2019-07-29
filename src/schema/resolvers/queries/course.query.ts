import { Course, CourseStudent } from '../../../db';
import { IPaging } from '../../../interfaces';

export default {
  Query: {
    async courses(
      _: any,
      { paging: { page = 1, limit = 10 } }: { paging: IPaging },
    ) {
      const data = await Course.find()
        .sort({
          createdAt: 'desc',
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .exec();

      return {
        data,
        page,
        limit,
        totalRecords: await Course.countDocuments().exec(),
      };
    },
    async course(_: any, { id }: { id: string }) {
      return await Course.findById(id)
        .populate('teachers')
        .exec();
    },
    async courseStudents(
      _: any,
      {
        courseId,
        paging: { page = 1, limit = 10 },
      }: { courseId: string; paging: IPaging },
    ) {
      const data = await CourseStudent.find(
        {
          course: courseId,
        },
        'student',
      )
        .sort({
          enrollementDate: 'desc',
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('student')
        .exec();

      return {
        data: data.map((courseStudent: any) => courseStudent.student),
        page,
        limit,
        totalRecords: await CourseStudent.countDocuments({
          course: courseId,
        }).exec(),
      };
    },
  },
};
