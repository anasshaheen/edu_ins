const { gql } = require('apollo-server-express');

module.exports = gql`
  input StudentExamInput {
    grade: Float
    student: String
  }
`;
