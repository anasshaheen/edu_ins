import { Course, CourseStudent, Message } from '../../../db';
import { subscriptionEvents } from '../../../constants';
import { responses } from '../../../utils';
import { IUser, IContextState } from '../../../interfaces';
import { pubSub } from '../../../services';

export default {
  Mutation: {
    async sendMessageToCourse(
      _: any,
      {
        courseId,
        input: { body },
      }: { courseId: string; input: { body: string } },
      { user }: IContextState,
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      const courseStudent = await CourseStudent.findOne({
        course: courseId,
        student: (<IUser>user)._id,
      });
      if (!courseStudent) {
        throw new Error('User is not authorzied to access this resource!');
      }

      let message = await Message.create({
        course: courseId,
        user: (<IUser>user)._id,
        body,
        createdAt: new Date(),
      });

      message = await message.populate('user').execPopulate();
      pubSub.publish(subscriptionEvents.MESSAGE_ADDED, message);

      return responses.add('Message');
    },
  },
};
