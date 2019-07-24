const { withFilter } = require('apollo-server-express');
const { CourseStudent } = require('../../../db');

const {
  subscriptionEvents: { MESSAGE_ADDED }
} = require('../../../constants');
const { pubSub } = require('../../../services');

module.exports = {
  Subscription: {
    messageAdded: {
      resolve(payload) {
        return payload;
      },
      subscribe: withFilter(
        () => pubSub.itrator(MESSAGE_ADDED),
        async (payload, { courseId }) => {
          const courseStudent = await CourseStudent.findOne({
            course: courseId,
            student: payload.user._id
          });

          return (
            payload.course.toString() === courseId &&
            courseStudent !== undefined
          );
        }
      )
    }
  }
};
