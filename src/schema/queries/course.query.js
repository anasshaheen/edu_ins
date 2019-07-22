const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    courses(paging: PaginationInput): [Course] @isAuth @isAdmin
    course(id: String): Course @isAuth @isStaffMember
    courseStudents(paging: PaginationInput, courseId: String): [User]
      @isAuth
      @isStaffMember
  }
`;
