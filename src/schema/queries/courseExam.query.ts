import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    courseExams(paging: PaginationInput, courseId: String): ExamPaginatedResult
      @isAuth
      @isStaffMember
    courseExam(id: String): Exam @isAuth @isStaffMember
  }
`;
