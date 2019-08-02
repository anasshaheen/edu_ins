import inputs from './inputs';
import outputs from './outputs';
import queries from './queries';
import mutations from './mutations';
import subscriptions from './subscriptions';
import types from './types';
import * as directives from './directives';
import resolvers from './resolvers';

const schema = {
  typeDefs: [
    ...inputs,
    ...outputs,
    ...queries,
    ...types,
    ...mutations,
    ...subscriptions,
    directives.schema,
  ],
  resolvers,
  schemaDirectives: directives.schemaDirectives,
};

export default schema;
