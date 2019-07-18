const { gql } = require('apollo-server-express');

module.exports = gql`
  type LoginOutput {
    token: AccessToken
    user: User
  }

  type AccessToken {
    access_token: String
    expires_in: String
  }
`;
