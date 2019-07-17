const { gql } = require('apollo-server-express');

module.exports = gql`
  type Resource {
    id: String!
    title: String
    description: String
    url: String
    user: User
  }
`;
