import { gql } from 'apollo-server-express';

export default gql`
  type CourseStudent {
    id: ID!
    course: Course
    student: User
    marks: [ExamMark]
  }
`;
