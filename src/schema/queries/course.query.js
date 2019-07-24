const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    courses(paging: PaginationInput): CoursePaginatedResult @isAuth @isAdmin
    course(id: String): Course @isAuth @isStaffMember
    courseStudents(
      paging: PaginationInput
      courseId: String
    ): CoursePaginatedResult @isAuth @isStaffMember
  }
`;
