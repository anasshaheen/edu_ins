const { gql } = require('apollo-server-express');

module.exports = gql`
  enum MimeType {
    FILE
    TEXT
  }
`;
