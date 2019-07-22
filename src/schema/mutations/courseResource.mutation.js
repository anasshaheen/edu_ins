const { gql } = require('apollo-server-express');

module.exports = gql`
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
