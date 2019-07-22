const { gql } = require('apollo-server-express');

const mainQuery = gql`
  type Mutation {
    _empty: String
  }
`;

module.exports = [
  mainQuery,
  require('./auth.mutation'),
  require('./admin.mutation'),
  require('./user.mutation'),
  require('./teacher.mutation')
];
