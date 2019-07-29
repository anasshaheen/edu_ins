import { gql } from 'apollo-server-express';

import AdminQuery from './admin.query';
import TeacherQuery from './teacher.query';
import StudentQuery from './student.query';
import CourseQuery from './course.query';
import GeneralResourceQuery from './generalResource.query';
import MessageQuery from './message.query';
import CourseExamQuery from './courseExam.query';
import StudentExamQuery from './studentExam.query';

const MainQuery = gql`
  type Query {
    _empty: String
  }
`;

export default [
  MainQuery,
  AdminQuery,
  TeacherQuery,
  StudentQuery,
  CourseQuery,
  GeneralResourceQuery,
  MessageQuery,
  CourseExamQuery,
  StudentExamQuery,
];
