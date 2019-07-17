const { gql } = require('apollo-server-express');

module.exports = gql`
  type Course {
    id: String!
    name: String!
    description: String
    syllable: Syllable
    teachers: [User]
    exams: [Exam]
    resources: [Resource]
  }
`;
