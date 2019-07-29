import { gql } from 'apollo-server-express';

export default gql`
  type ExamMark {
    id: ID!
    exam: Exam
    student: User
    grade: Float
  }
`;
