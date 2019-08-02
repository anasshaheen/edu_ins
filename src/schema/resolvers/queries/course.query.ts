import { RedisClient } from 'src/utils';
import { Course, CourseStudent } from '../../../db';
import { IContextState, ICourse, IPaging } from '../../../interfaces';
import { Cache } from '../../../constants';

async function setCoursesIfNotExists(redisClient: RedisClient) {
  let courses = [];
  const coursesExists = await redisClient.exists(Cache.CacheKeys.COURSES);
  if (!coursesExists) {
    courses = await Course.find()
      .populate('teachers')
      .sort({
        createdAt: 'desc',
      });

    redisClient.setWithExpirationTime(
      Cache.CacheKeys.COURSES,
      Cache.CacheExpirationTimes.COURSE_EXPIRATION_TIME,
      courses,
    );
  } else {
    courses = await redisClient.get(Cache.CacheKeys.COURSES);
  }

  return courses;
}

export default {
  Query: {
    async courses(
      _: object,
      { paging: { page = 1, limit = 10 } }: { paging: IPaging },
      { redisClient }: IContextState,
    ) {
      const courses = await setCoursesIfNotExists(redisClient);

      const data: ICourse[] = [];
      const itemsToSkip = limit * (page - 1);
      for (let i = itemsToSkip; i < courses.length && limit > 0; ++i, limit--) {
        const course = courses[i];
        course.id = course._id;
        data.push(course);
      }

      return {
        data,
        page,
        limit,
        totalRecords: await Course.countDocuments().exec(),
      };
    },
    async course(
      _: object,
      { id }: { id: string },
      { redisClient }: IContextState,
    ) {
      const courses = await setCoursesIfNotExists(redisClient);

      const searchResult = courses.filter(
        (course: ICourse) => course._id === id,
      );
      if (searchResult.length && searchResult[0]) {
        const course = searchResult[0];
        course.id = searchResult[0]._id;

        return course;
      }

      throw new Error('Course does not exists!');
    },
    async courseStudents(
      _: object,
      {
        courseId,
        paging: { page = 1, limit = 10 },
      }: { courseId: string; paging: IPaging },
    ) {
      const data = await CourseStudent.find(
        {
          course: courseId,
        },
        'student',
      )
        .sort({
          enrollementDate: 'desc',
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('student')
        .exec();

      return {
        data: data.map((courseStudent: any) => courseStudent.student),
        page,
        limit,
        totalRecords: await CourseStudent.countDocuments({
          course: courseId,
        }).exec(),
      };
    },
  },
};
