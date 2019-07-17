const { gql } = require('apollo-server-express');

module.exports = gql`
  type CourseStudent {
    id: String!
    course: Course
    student: User
    marks: [ExamMark]
  }
`;
