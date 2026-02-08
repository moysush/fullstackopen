const { ApolloServer } = require("@apollo/server");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { expressMiddleware } = require("@as-integrations/express5");
const express = require("express");
const cors = require("cors");
const http = require("http");
// graphql-ws
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/use/ws");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

// so that we can check if the user is authenticated
const getUserFromAuthHeader = async (auth) => {
  if (!auth || !auth.startsWith("Bearer ")) {
    return null;
  }
  const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
  return await User.findById(decodedToken.id);
};

const startServer = async (port) => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart(){
          return {
            async drainServer(){
              await serverCleanup.dispose()
            }
          }
        }
      }
    ],
  });

  await server.start();


  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization; // getting from header
        const currentUser = await getUserFromAuthHeader(auth); // decode and return the user
        return { currentUser };
      },
    }),
  );

  httpServer.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/`);
  });
};

module.exports = startServer;
