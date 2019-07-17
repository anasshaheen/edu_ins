const { gql } = require('apollo-server-express');

module.exports = gql`
  type Syllable {
    id: String!
    sections: [SyllableSection]!
  }
`;
