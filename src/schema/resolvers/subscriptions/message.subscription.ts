import { withFilter } from 'apollo-server-express';

import { CourseStudent } from '../../../db';
import { subscriptionEvents } from '../../../constants';
import { pubSub } from '../../../services';

export default {
  Subscription: {
    messageAdded: {
      resolve(payload: any) {
        return payload;
      },
      subscribe: withFilter(
        () => pubSub.itrator(subscriptionEvents.MESSAGE_ADDED),
        async (payload: any, { courseId }: { courseId: string }) => {
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
