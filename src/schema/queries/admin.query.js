const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    admins: [User]
  }
`;
