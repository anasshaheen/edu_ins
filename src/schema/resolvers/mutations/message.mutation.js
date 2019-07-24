const { Course, CourseStudent, Message } = require('../../../db');
const { subscriptionEvents } = require('../../../constants');
const { responses } = require('../../../utils');
const { pubSub } = require('../../../services');

module.exports = {
  Mutation: {
    async sendMessageToCourse(
      _,
      {
        courseId,
        input: { body }
      },
      {
        user: { _id }
      }
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      const courseStudent = await CourseStudent.findOne({
        course: courseId,
        student: _id
      });
      if (!courseStudent) {
        throw new Error('User is not authorzied to access this resource!');
      }

      let message = new Message({
        course: courseId,
        user: _id,
        body,
        createdAt: new Date()
      });
      await message.save();

      message = await message.populate('user').execPopulate();
      pubSub.publish(subscriptionEvents.MESSAGE_ADDED, message);

      return responses.addResponse('Message');
    }
  }
};
