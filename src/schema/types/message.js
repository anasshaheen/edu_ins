const { gql } = require('apollo-server-express');

module.exports = gql`
  type Message {
    id: String!
    body: String
    mimeType: MimeType
    user: User
    course: Course
  }
`;
