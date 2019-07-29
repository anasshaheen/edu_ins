import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    addStudent(input: AddUserInput): ResponseOutput @isAuth @isAdmin
  }
`;
