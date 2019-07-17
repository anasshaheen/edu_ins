const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: String!
    avatar: String
    phone: String
    email: String
    name: String
    role: String
  }
`;
