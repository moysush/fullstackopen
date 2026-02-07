const { GraphQLError } = require("graphql/error");
const { PubSub } = require("graphql-subscriptions");
const Person = require("./models/person");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      console.log("Person.find");

      if (!args.phone) {
        // filters missing
        return await Person.find({}).populate("friendOf");
      }

      return await Person.find({
        phone: { $exists: args.phone === "YES" },
      }).populate("friendOf");
    },
    findPerson: async (root, args) =>
      await Person.findOne({ name: args.name }).populate("friendOf"),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  // it's okay to omit it too if we don't need to hard code any default value
  Person: {
    name: (root) => root.name, // e.g. "defaultName"
    phone: (root) => root.phone,
    address: ({ street, city }) => {
      return {
        street,
        city,
      };
    },
    id: (root) => root.id,
    // friendOf: async (root) => {
    //   console.log("User.find");

    //   const friends = await User.find({
    //     friends: {
    //       $in: [root._id],
    //     },
    //   });

    //   return friends;
    // },
  },

  Mutation: {
    addPerson: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }
      const nameExists = await Person.exists({ name: args.name });
      if (nameExists) {
        throw new GraphQLError(`Name must be unique: ${args.name}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      const person = new Person({ ...args });

      try {
        // await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();

        // saving the user to friendOf
        person.friendOf = person.friendOf.concat(currentUser);
        await person.save();
      } catch (error) {
        throw new GraphQLError(`Saving person failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      pubsub.publish("PERSON_ADDED", { personAdded: person });

      return person;
    },

    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      if (!person) {
        return null;
      }

      person.phone = args.phone;

      try {
        await person.save();
      } catch (error) {
        throw new GraphQLError(`Saving number failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return person;
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new GraphQLError(`Creating the user failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterableIterator("PERSON_ADDED"),
    },
  },
};

module.exports = resolvers;
