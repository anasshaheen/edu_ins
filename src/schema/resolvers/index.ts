import queries from './queries';
import mutations from './mutations';
import subscriptions from './subscriptions';

const MainResolver = {
  Query: {
    _empty: () => 'Hello from query!',
  },
  Mutation: {
    _empty: () => 'Hello from mutation!',
  },
  PaginatedResult: {
    __resolveType: () => 'PaginatedResult',
  },
};

export default [MainResolver, ...queries, ...mutations, ...subscriptions];
