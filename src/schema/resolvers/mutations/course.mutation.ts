import { Course } from '../../../db';
import { responses } from '../../../utils';
import { ICourse } from '../../../interfaces';

export default {
  Mutation: {
    async addCourse(_: any, { input }: { input: ICourse }) {
      input.createdAt = new Date();
      const course = new Course(input);
      await course.save();

      return responses.add('Course');
    },
    async updateCourse(
      _: any,
      { id, input: { name, description } }: { id: string; input: ICourse },
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

      await Course.findByIdAndUpdate(id, fieldsToBeUpdated);

      return responses.update('Course');
    },
    async removeCourse(_: any, { id }: { id: string }) {
      const course = await Course.findById(id);
      if (!course) {
        throw new Error('Course not found!');
      }

      await course.remove();

      return responses.remove('Course');
    },
    async updateCourseTeachers(
      _: any,
      { id, teachers }: { id: string; teachers: [string] },
    ) {
      if (!teachers.length) {
        throw new Error('Please, provide valid teachers');
      }

      const course = await Course.findById(id);
      if (!course) {
        throw new Error('Course not found!');
      }

      await course.updateOne({ teachers });

      return responses.remove('Course');
    },
  },
};
