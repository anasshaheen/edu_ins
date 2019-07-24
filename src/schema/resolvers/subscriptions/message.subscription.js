const { withFilter } = require('apollo-server-express');

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
        (payload, { courseId }) => {
          return payload.course.toString() === courseId;
        }
      )
    }
  }
};
