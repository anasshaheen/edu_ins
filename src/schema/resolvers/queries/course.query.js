const { Course, CourseStudent } = require('../../../db');

module.exports = {
  Query: {
    async courses(
      _,
      {
        paging: { page = 1, limit = 10 }
      }
    ) {
      return await Course.find()
        .sort({
          createdAt: 'desc'
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .exec();
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

      return data.map(courseStudent => courseStudent.student);
    }
  }
};
