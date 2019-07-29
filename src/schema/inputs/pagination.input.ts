import { gql } from 'apollo-server-express';

export default gql`
  input PaginationInput {
    page: Int
    limit: Int
  }
`;
