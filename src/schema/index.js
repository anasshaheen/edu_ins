module.exports = {
  typeDefs: [
    ...require('./inputs'),
    ...require('./outputs'),
    ...require('./queries'),
    ...require('./types'),
    ...require('./mutations'),
    ...require('./subscriptions'),
    require('./directives').schema
  ],
  resolvers: require('./resolvers'),
  schemaDirectives: require('./directives').schemaDirectives
};
