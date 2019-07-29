import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    courseMessages(
      courseId: String
      paging: PaginationInput
    ): MessagePaginatedResult @isAuth
  }
`;
