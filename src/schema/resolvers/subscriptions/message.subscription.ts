import { withFilter } from 'apollo-server-express';
import { IUser, ICourse } from 'src/interfaces';

import { subscriptionEvents } from '../../../constants';
import { CourseStudent } from '../../../db';
import { pubSub } from '../../../services';

export default {
  Subscription: {
    messageAdded: {
      resolve(payload: object) {
        return payload;
      },
      subscribe: withFilter(
        () => pubSub.itrator(subscriptionEvents.MESSAGE_ADDED),
        async (
          payload: { user: IUser; course: ICourse },
          { courseId }: { courseId: string },
        ) => {
          const courseStudent = await CourseStudent.findOne({
            course: courseId,
            student: payload.user._id,
          });

          return (
            payload.course.toString() === courseId &&
            courseStudent !== undefined
          );
        },
      ),
    },
  },
};
