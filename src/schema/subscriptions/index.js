const { gql } = require('apollo-server-express');

const mainSubscription = gql`
  type Subscription {
    _empty: String
  }
`;

module.exports = [mainSubscription, require('./message.subscription')];
