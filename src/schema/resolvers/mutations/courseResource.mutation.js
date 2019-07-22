const { Course } = require('../../../db');
const { responses } = require('../../../utils');

module.exports = {
  Mutation: {
    async addResource(
      _,
      { courseId, resource },
      {
        user: { _id }
      }
    ) {
      try {
        const course = await Course.findById(courseId);
        if (!course) {
          throw new Error('Course not found!');
        }

        resource.user = _id;
        course.resources.push(resource);
        await course.save();

        return responses.addResponse('Resource');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async updateResource(_, { courseId, resourceId, resource }) {
      try {
        const course = await Course.findById(courseId);
        if (!course) {
          throw new Error('Course not found!');
        }

        await Course.updateOne(
          {
            'resources._id': resourceId
          },
          {
            $set: {
              'resources.$.title': resource.title,
              'resources.$.description': resource.description,
              'resources.$.url': resource.url
            }
          }
        );

        return responses.updateResponse('Resource');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async removeResource(_, { courseId, resourceId }) {
      try {
        const course = await Course.findById(courseId);
        if (!course) {
          throw new Error('Course not found!');
        }

        await Course.updateOne(
          {
            _id: courseId
          },
          {
            $pull: {
              resources: {
                _id: resourceId
              }
            }
          }
        );

        return responses.removeResponse('Resource');
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
