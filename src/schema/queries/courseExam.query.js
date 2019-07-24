const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    courseExams(paging: PaginationInput, courseId: String): [Exam]
      @isAuth
      @isStaffMember
    courseExam(id: String): Exam @isAuth @isStaffMember
  }
`;
