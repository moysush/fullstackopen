const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};
      if (args.author) {
        // we need to send the author._id for the query to the database
        const author = await Author.findOne({ name: args.author });
        if (author) {
          query.author = author._id;
        } else {
          return [];
        }
      }
      if (args.genre) {
        query.genres = args.genre;
      }
      return await Book.find(query);
    },
    allAuthors: async () => {
      console.log("Fetching all authors");
      return await Author.find({});
    },
    me: (root, args, context) => context.currentUser,
  },
  // for each author
  // the root here is of Author
  // these are a little complex
  Author: {
    bookCount: async (root, args, context) => {
      // the load() is loading each request to send just one request to the database for better peroformance
      return context.loaders.bookCount.load(root._id);
    },
  },
  // runs everytime any query needs to resolve the author field
  Book: {
    author: async (root) => {
      return await Author.findById(root.author);
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError(`Not Authenticated`, {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        await author.save().catch((error) => {
          throw new GraphQLError(
            `Author could not be saved; ${error.message}`,
            {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
              },
            },
          );
        });
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id,
      });

      await book.save().catch((error) => {
        throw new GraphQLError(`Book could not be saved; ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      });

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError(`Not Authenticated`, {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const author = await Author.findOneAndUpdate(
        { name: args.name }, // filter
        { born: args.setBornTo }, // update
        { new: true }, // return the new updated data
      );
      return author;
    },

    createUser: async (root, args) => {
      const user = new User({
        ...args,
      });

      return await user.save();
    },

    login: async (root, args) => {
      // try with await later
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError(`Not authenticated`, {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      // we are using the username and user id for for the token
      const sign = jwt.sign(userForToken, process.env.JWT_SECRET);
      return { value: sign };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
