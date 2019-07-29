import { gql } from 'apollo-server-express';

export default gql`
  input MessageInput {
    body: String!
  }
`;
