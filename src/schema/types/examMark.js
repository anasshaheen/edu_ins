const { gql } = require('apollo-server-express');

module.exports = gql`
  type ExamMark {
    id: String!
    exam: Exam
    student: User
    grade: Float
  }
`;
