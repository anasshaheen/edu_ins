import { gql } from 'apollo-server-express';

export default gql`
  type ResponseOutput {
    message: String!
    code: Int!
  }
`;
