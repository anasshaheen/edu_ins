const { gql } = require('apollo-server-express');

const mainQuery = gql`
  type Mutation {
    _empty: String
  }
`;

module.exports = [mainQuery, require('./auth.mutation')];
