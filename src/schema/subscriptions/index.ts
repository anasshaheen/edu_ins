import { gql } from 'apollo-server-express';

import MessageSubscription from './message.subscription';

const MainSubscription = gql`
  type Subscription {
    _empty: String
  }
`;

export default [MainSubscription, MessageSubscription];
