const { Course, CourseStudent, Message } = require('../../../db');

module.exports = {
  Query: {
    courseMessages: async (
      _,
      { courseId, paging: { page = 1, limit = 10 } },
      { user: { _id } }
    ) => {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      const courseStudent = await CourseStudent.findOne({
        course: courseId,
        user: _id
      });
      if (!courseStudent) {
        throw new Error('User is not authorzied to access this resource!');
      }

      const data = await Message.find({
        course: courseId
      })
        .sort({
          createdAt: 'desc'
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .select();

      return {
        data,
        page,
        limit,
        totalRecords: await Message.countDocuments({
          course: courseId
        }).exec()
      };
    }
  }
};
