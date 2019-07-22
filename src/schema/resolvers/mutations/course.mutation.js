const { Course } = require('../../../db');
const { responses } = require('../../../utils');

module.exports = {
  Mutation: {
    async addCourse(_, { input }) {
      try {
        input.createdAt = new Date();
        const course = new Course(input);
        await course.save();

        const res = responses.addResponse('Course');
        res.id = course._id;

        return res;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async updateCourse(
      _,
      {
        id,
        input: { name, description }
      }
    ) {
      try {
        const course = await Course.findById(id);
        if (!course) {
          throw new Error('Course not found!');
        }

        const fieldsToBeUpdated = {};
        if (name) {
          fieldsToBeUpdated.name = name;
        }
        if (description) {
          fieldsToBeUpdated.description = description;
        }

        await Course.findByIdAndUpdate(id, fieldsToBeUpdated);

        return responses.updateResponse('Course');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async removeCourse(_, { id }) {
      try {
        const course = await Course.findById(id);
        if (!course) {
          throw new Error('Course not found!');
        }

        await course.remove();

        return responses.removeResponse('Course');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async updateCourseTeachers(_, { id, teachers }) {
      try {
        if (!teachers.length) {
          throw new Error('Please, provide valid teachers');
        }

        const course = await Course.findById(id);
        if (!course) {
          throw new Error('Course not found!');
        }

        await course.updateOne({ teachers });

        return responses.removeResponse('Course');
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
