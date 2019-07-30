import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    addAdmin(input: AddUserInput): ResponseOutput
  }
`;
