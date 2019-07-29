import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    addGeneralResource(input: ResourceInput): ResponseOutput
      @isAuth
      @isStaffMember
    updateGeneralResource(id: String, input: ResourceInput): ResponseOutput
      @isAuth
      @isStaffMember
    removeGeneralResource(id: String): ResponseOutput @isAuth @isStaffMember
  }
`;
