const { gql } = require('apollo-server-express');

module.exports = gql`
  type SyllableSection {
    id: String!
    title: String
    description: String
  }
`;
