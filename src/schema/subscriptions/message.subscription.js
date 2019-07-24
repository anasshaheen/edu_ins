const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Subscription {
    messageAdded(courseId: String!): Message
  }
`;
