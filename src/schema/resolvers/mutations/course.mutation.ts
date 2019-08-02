import { Document } from 'mongoose';

import { Cache } from '../../../constants';
import { Course } from '../../../db';
import { IContextState, ICourse } from '../../../interfaces';
import { responses } from '../../../utils';

export default {
  Mutation: {
    async addCourse(
      _: object,
      { input }: { input: ICourse },
      { redisClient }: IContextState,
    ) {
      input.createdAt = new Date();
      const course = await Course.create(input);

      if (await redisClient.exists(Cache.CacheKeys.COURSES)) {
        const courses: Document[] = await redisClient.get(
          Cache.CacheKeys.COURSES,
        );
        courses.push(course);
        redisClient.setWithExpirationTime(
          Cache.CacheKeys.COURSES,
          Cache.CacheExpirationTimes.COURSE_EXPIRATION_TIME,
          courses,
        );
      }

      return responses.add('Course');
    },
    async updateCourse(
      _: object,
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
      _: object,
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
      _: object,
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
