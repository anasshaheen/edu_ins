module.exports = {
  typeDefs: [
    ...require('./queries'),
    ...require('./types'),
    ...require('./mutations')
  ],
  resolvers: require('./resolvers')
};
