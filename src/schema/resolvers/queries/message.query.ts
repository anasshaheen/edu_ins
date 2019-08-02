import { Course, CourseStudent, Message } from '../../../db';
import { IPaging, IContextState, IUser } from '../../../interfaces';

export default {
  Query: {
    courseMessages: async (
      _: object,
      {
        courseId,
        paging: { page = 1, limit = 10 },
      }: { courseId: string; paging: IPaging },
      { user }: IContextState,
    ) => {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      const courseStudent = await CourseStudent.findOne({
        course: courseId,
        user: (user as IUser)._id,
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
