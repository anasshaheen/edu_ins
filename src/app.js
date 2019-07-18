require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { initDb, seedDb } = require('./services');
const { typeDefs, resolvers, schemaDirectives } = require('./schema');
const { verifyToken, decodeToken } = require('./utils');
const { User } = require('./db');

module.exports = async () => {
  try {
    initDb();
    await seedDb();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      context: async ({ req }) => {
        let token = req.headers.authorization || '';
        if (!token) {
          return { user: undefined, isLoggedIn: false };
        }

        token = token.substring(7).trim();
        if (!verifyToken(token)) {
          return { user: undefined, isLoggedIn: false };
        }

        const {
          payload: { email }
        } = decodeToken(token);
        const user = await User.findOne({ email });
        if (!user) {
          return { user: undefined, isLoggedIn: false };
        }

        return { user, isLoggedIn: true };
      }
    });
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
