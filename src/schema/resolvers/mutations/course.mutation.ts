import { Course } from '../../../db';
import { responses } from '../../../utils';
import { ICourse, IContextState } from '../../../interfaces';
import { Cache } from '../../../constants';

export default {
  Mutation: {
    async addCourse(
      _: any,
      { input }: { input: ICourse },
      { redisClient }: IContextState,
    ) {
      input.createdAt = new Date();
      const course = await Course.create(input);

      if (await redisClient.exists(Cache.CacheKeys.COURSES)) {
        const courses = JSON.parse(
          await redisClient.get(Cache.CacheKeys.COURSES),
        );
        courses.push(course);
        redisClient.setWithExpirationTime(
          Cache.CacheKeys.COURSES,
          Cache.CacheExpirationTimes.COURSE_EXPIRATION_TIME,
          JSON.stringify(courses),
        );
      }

      return responses.add('Course');
    },
    async updateCourse(
      _: any,
      { id, input: { name, description } }: { id: string; input: ICourse },
      { redisClient }: IContextState,
    ) {
      const course = await Course.findById(id);
      if (!course) {
        throw new Error('Course not found!');
      }

      const fieldsToBeUpdated: Partial<ICourse> = {};
      if (name) {
        fieldsToBeUpdated.name = name;
      }
      if (description) {
        fieldsToBeUpdated.description = description;
      }

      await course.updateOne(fieldsToBeUpdated);
      if (await redisClient.exists(Cache.CacheKeys.COURSES)) {
        redisClient.delete(Cache.CacheKeys.COURSES);
      }

      return responses.update('Course');
    },
    async removeCourse(
      _: any,
      { id }: { id: string },
      { redisClient }: IContextState,
    ) {
      const course = await Course.findById(id);
      if (!course) {
        throw new Error('Course not found!');
      }

      await course.remove();
      if (await redisClient.exists(Cache.CacheKeys.COURSES)) {
        redisClient.delete(Cache.CacheKeys.COURSES);
      }

      return responses.remove('Course');
    },
    async updateCourseTeachers(
      _: any,
      { id, teachers }: { id: string; teachers: [string] },
      { redisClient }: IContextState,
    ) {
      if (!teachers.length) {
        throw new Error('Please, provide valid teachers');
      }

      const course = await Course.findById(id);
      if (!course) {
        throw new Error('Course not found!');
      }

      await course.updateOne({ teachers });
      if (await redisClient.exists(Cache.CacheKeys.COURSES)) {
        redisClient.delete(Cache.CacheKeys.COURSES);
      }

      return responses.remove('Course');
    },
  },
};
