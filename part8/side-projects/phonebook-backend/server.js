const { ApolloServer } = require("@apollo/server");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { expressMiddleware } = require("@as-integrations/express5");
const cors = require("cors");
const express = require("express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const http = require("http");
const jwt = require("jsonwebtoken");

const resolvers = require("./resolvers");
const typeDefs = require("./schema");
const User = require("./models/user");

// login logic happens here
const getUserFromAuthHeader = async (auth) => {
  if (!auth || !auth.startsWith("Bearer ")) {
    return null;
  }

  // decodedToken decodes the token for the user detail which we can try to find in the database
  const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
  return User.findById(decodedToken.id).populate("friends"); // populate simply populates the friends field for that user
};

const startServer = async (port) => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // graphql server
  await server.start();

  // express middlware
  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization;
        const currentUser = await getUserFromAuthHeader(auth);
        return currentUser;
      },
    }),
  );

  httpServer.listen(port, () => {
    console.log(`server is now running on http://localhost:${port}`);
  });
};

module.exports = startServer;
