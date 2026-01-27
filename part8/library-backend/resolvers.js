const Book = require("./models/book");
const Author = require("./models/author");
const author = require("./models/author");

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
    allAuthors: async () => await Author.find({}),
  },
  // for each author
  // the root here is of Author
  // these are a little complex
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id });
    },
  },
  // runs everytime any query needs to resolve the author field
  Book: {
    author: async (root) => {
      return await Author.findById(root.author);
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id,
      });
      return await book.save();
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOneAndUpdate(
        { name: args.name }, // filter
        { born: args.setBornTo }, // update
        { new: true }, // return the new updated data
      );
      return author;
    },
  },
};

module.exports = resolvers;
