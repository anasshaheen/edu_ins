const { Course } = require('../../../db');
const { responses } = require('../../../utils');

module.exports = {
  Mutation: {
    async addSyllableSection(_, { courseId, section }) {
      try {
        const course = await Course.findById(courseId);
        if (!course) {
          throw new Error('Course not found!');
        }

        course.syllable.sections.push(section);
        await course.save();

        return responses.addResponse('Syllable Section');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async updateSyllableSection(_, { courseId, sectionId, section }) {
      try {
        const course = await Course.findById(courseId);
        if (!course) {
          throw new Error('Course not found!');
        }

        await Course.updateOne(
          {
            'syllable.sections._id': sectionId
          },
          {
            $set: {
              'syllable.sections.$.title': section.title,
              'syllable.sections.$.description': section.description
            }
          }
        );

        return responses.updateResponse('Syllable Section');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async removeSyllableSection(_, { courseId, sectionId }) {
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
              'syllable.sections': {
                _id: sectionId
              }
            }
          }
        );

        return responses.removeResponse('Syllable Section');
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
