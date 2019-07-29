import { gql } from 'apollo-server-express';

export default gql`
  type Syllable {
    id: ID!
    sections: [SyllableSection]!
  }
`;
