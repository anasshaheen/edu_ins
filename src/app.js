require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { initDb, seedDb } = require('./services');
const { typeDefs, resolvers } = require('./schema');

module.exports = async () => {
  try {
    initDb();
    await seedDb();

    const server = new ApolloServer({ typeDefs, resolvers });
    const app = express();

    server.applyMiddleware({ app });

    const port = process.env.PORT || 4000;

    app.listen({ port }, () =>
      console.log(`server is starting at port ${port}`)
    );
  } catch (err) {
    console.log(err);
  }
};
