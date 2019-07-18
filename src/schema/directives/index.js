const { gql } = require('apollo-server-express');

const schema = gql`
  directive @isAuth on FIELD_DEFINITION
  directive @isAdmin on FIELD_DEFINITION
`;

module.exports = {
  schema,
  schemaDirectives: {
    isAuth: require('./isAuth.directive'),
    isAdmin: require('./isAdmin.directive')
  }
};
