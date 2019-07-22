const { gql } = require('apollo-server-express');

module.exports = gql`
  type GeneralResource {
    id: String!
    title: String
    description: String
    url: String
    user: User
    createdAt: String
  }
`;
