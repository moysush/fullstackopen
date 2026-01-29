const { startStandaloneServer } = require("@apollo/server/standalone");
const { ApolloServer } = require("@apollo/server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const getUserFromAuthHeader = async (auth) => {
  if (!auth || !auth.startsWith("Bearer ")) {
    return null;
  }
  const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
  return await User.findById(decodedToken.id);
};

const startServer = (port) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  startStandaloneServer(server, {
    listen: { port },
    // context is like react context; it can make something available to any resolvers
    context: async ({ req }) => {
      const auth = req.headers.authorization; // getting from header
      const currentUser = await getUserFromAuthHeader(auth); // decode and return the user
      return { currentUser };
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

module.exports = startServer;
