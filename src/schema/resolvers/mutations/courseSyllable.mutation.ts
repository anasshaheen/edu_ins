import { Course } from '../../../db';
import { responses } from '../../../utils';
import { ISyllableSection } from '../../../interfaces';

export default {
  Mutation: {
    async addSyllableSection(
      _: any,
      { courseId, section }: { courseId: string; section: ISyllableSection },
    ) {
      const course = <any>await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found!');
      }

      course.syllable.sections.push(section);
      await course.save();

      return responses.add('Syllable Section');
    },
    async updateSyllableSection(
      _: any,
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
      _: any,
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
