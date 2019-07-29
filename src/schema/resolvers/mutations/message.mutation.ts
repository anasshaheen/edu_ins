import { Course, CourseStudent, Message } from '../../../db';
import { subscriptionEvents } from '../../../constants';
import { responses } from '../../../utils';
import { IUser } from '../../../interfaces';
import { pubSub } from '../../../services';

export default {
  Mutation: {
    async sendMessageToCourse(
      _: any,
      {
        courseId,
        input: { body },
      }: { courseId: string; input: { body: string } },
      { user: { _id } }: { user: IUser },
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      const courseStudent = await CourseStudent.findOne({
        course: courseId,
        student: _id,
      });
      if (!courseStudent) {
        throw new Error('User is not authorzied to access this resource!');
      }

      let message = await Message.create({
        course: courseId,
        user: _id,
        body,
        createdAt: new Date(),
      });

      message = await message.populate('user').execPopulate();
      pubSub.publish(subscriptionEvents.MESSAGE_ADDED, message);

      return responses.add('Message');
    },
  },
};
