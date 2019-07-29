import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    generalResources(paging: PaginationInput): GeneralResourcePaginatedResult
      @isAuth
    generalResource(id: String): GeneralResource @isAuth
  }
`;
