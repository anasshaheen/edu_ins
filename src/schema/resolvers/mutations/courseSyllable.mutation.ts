import { Course } from '../../../db';
import { responses } from '../../../utils';
import { ISyllableSection } from '../../../interfaces';

export default {
  Mutation: {
    async addSyllableSection(
      _: object,
      { courseId, section }: { courseId: string; section: ISyllableSection },
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      const syllable = course.get('syllable');
      syllable.sections.push(section);
      await course.updateOne({
        syllable,
      });

      return responses.add('Syllable Section');
    },
    async updateSyllableSection(
      _: object,
      {
        courseId,
        sectionId,
        section,
      }: { courseId: string; sectionId: string; section: ISyllableSection },
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      await Course.updateOne(
        {
          'syllable.sections._id': sectionId,
        },
        {
          $set: {
            'syllable.sections.$.title': section.title,
            'syllable.sections.$.description': section.description,
          },
        },
      );

      return responses.update('Syllable Section');
    },
    async removeSyllableSection(
      _: object,
      { courseId, sectionId }: { courseId: string; sectionId: string },
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
            'syllable.sections': {
              _id: sectionId,
            },
          },
        },
      );

      return responses.remove('Syllable Section');
    },
  },
};
