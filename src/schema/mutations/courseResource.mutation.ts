import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    addResource(courseId: String, resource: ResourceInput): ResponseOutput
      @isAuth
      @isStaffMember
    updateResource(
      courseId: String
      resourceId: String
      resource: ResourceInput
    ): ResponseOutput @isAuth @isStaffMember
    removeResource(courseId: String, resourceId: String): ResponseOutput
      @isAuth
      @isStaffMember
  }
`;
