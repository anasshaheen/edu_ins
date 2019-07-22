const { gql } = require('apollo-server-express');

const mainQuery = gql`
  type Query {
    _empty: String
  }
`;

module.exports = [
  mainQuery,
  require('./admin.query'),
  require('./teacher.query'),
  require('./student.query'),
  require('./course.query'),
  require('./generalResource.query')
];
