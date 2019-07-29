import { Course, CourseStudent, Message } from '../../../db';
import { IPaging, IUser } from '../../../interfaces';

export default {
  Query: {
    courseMessages: async (
      _: any,
      {
        courseId,
        paging: { page = 1, limit = 10 },
      }: { courseId: string; paging: IPaging },
      { user: { _id } }: { user: IUser },
    ) => {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      const courseStudent = await CourseStudent.findOne({
        course: courseId,
        user: _id,
      });
      if (!courseStudent) {
        throw new Error('User is not authorzied to access this resource!');
      }

      const data = await Message.find()
        .sort({
          createdAt: 'desc',
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .where({
          course: courseId,
        })
        .exec();

      return {
        data,
        page,
        limit,
        totalRecords: await Message.countDocuments({
          course: courseId,
        }).exec(),
      };
    },
  },
};
