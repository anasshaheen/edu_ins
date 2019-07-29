import { gql } from 'apollo-server-express';

export default gql`
  type LoginOutput {
    token: AccessToken
    user: User
  }

  type AccessToken {
    access_token: String
    expires_in: String
  }
`;
