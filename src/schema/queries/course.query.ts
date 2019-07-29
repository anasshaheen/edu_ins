import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    courses(paging: PaginationInput): CoursePaginatedResult @isAuth @isAdmin
    course(id: String): Course @isAuth @isStaffMember
    courseStudents(
      paging: PaginationInput
      courseId: String
    ): CoursePaginatedResult @isAuth @isStaffMember
  }
`;
