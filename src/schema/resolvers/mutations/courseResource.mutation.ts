import { Course } from '../../../db';
import { responses } from '../../../utils';
import { IResource, IUser, IContextState } from '../../../interfaces';

export default {
  Mutation: {
    async addResource(
      _: object,
      { courseId, resource }: { courseId: string; resource: IResource },
      { user }: IContextState,
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      resource.user = (user as IUser)._id;
      const resources = course.get('resources');
      resources.push(resource);
      await course.updateOne({
        resources,
      });

      return responses.add('Resource');
    },
    async updateResource(
      _: object,
      {
        courseId,
        resourceId,
        resource,
      }: { courseId: string; resourceId: string; resource: IResource },
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      await Course.updateOne(
        {
          'resources._id': resourceId,
        },
        {
          $set: {
            'resources.$.title': resource.title,
            'resources.$.description': resource.description,
            'resources.$.url': resource.url,
          },
        },
      );

      return responses.update('Resource');
    },
    async removeResource(
      _: object,
      { courseId, resourceId }: { courseId: string; resourceId: string },
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      await Course.updateOne(
        {
          _id: courseId,
        },
        {
          $pull: {
            resources: {
              _id: resourceId,
            },
          },
        },
      );

      return responses.remove('Resource');
    },
  },
};
