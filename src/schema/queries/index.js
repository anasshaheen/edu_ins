const { gql } = require('apollo-server-express');

const mainQuery = gql`
  type Query {
    _empty: String
  }
`;

module.exports = [mainQuery, require('./admin.query')];
