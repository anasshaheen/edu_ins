const { Course, CourseStudent } = require('../../../db');

module.exports = {
  Query: {
    async courses(
      _,
      {
        paging: { page = 1, limit = 10 }
      }
    ) {
      const data = await Course.find()
        .sort({
          createdAt: 'desc'
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .exec();

      return {
        data,
        page,
        limit,
        totalRecords: await Course.countDocuments().exec()
      };
    },
    async course(_, { id }) {
      return await Course.populate('teachers').findById(id);
    },
    async courseStudents(
      _,
      {
        courseId,
        paging: { page = 1, limit = 10 }
      }
    ) {
      const data = await CourseStudent.find(
        {
          course: courseId
        },
        'student'
      )
        .sort({
          enrollementDate: 'desc'
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('student')
        .exec();

      return {
        data: data.map(courseStudent => courseStudent.student),
        page,
        limit,
        totalRecords: await CourseStudent.countDocuments({
          course: courseId
        }).exec()
      };
    }
  }
};
