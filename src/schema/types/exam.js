const { gql } = require('apollo-server-express');

module.exports = gql`
  type Exam {
    id: String!
    name: String
    description: String
    grade: Float
  }
`;
