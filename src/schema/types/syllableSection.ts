import { gql } from 'apollo-server-express';

export default gql`
  type SyllableSection {
    id: ID!
    title: String
    description: String
  }
`;
