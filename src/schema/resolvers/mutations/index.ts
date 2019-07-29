import AuthMutation from './auth.mutation';
import AdminMutation from './admin.mutation';
import UserMutation from './user.mutation';
import TeacherMutation from './teacher.mutation';
import StudentMutation from './student.mutation';
import CourseMutation from './course.mutation';
import CourseExamMutation from './courseExam.mutation';
import CourseResourceMutation from './courseResource.mutation';
import CourseSyllableMutation from './courseSyllable.mutation';
import GeneralResourceMutation from './generalResource.mutation';
import MessageMutation from './message.mutation';
import StudentExamMutation from './studentExam.mutation';

export default [
  AuthMutation,
  StudentExamMutation,
  MessageMutation,
  GeneralResourceMutation,
  CourseSyllableMutation,
  CourseResourceMutation,
  CourseExamMutation,
  CourseMutation,
  TeacherMutation,
  StudentMutation,
  AdminMutation,
  UserMutation,
];
