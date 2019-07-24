const { gql } = require('apollo-server-express');

module.exports = gql`
  type Message {
    id: String!
    body: String
    user: User
    course: Course
    createdAt: String
  }
`;
