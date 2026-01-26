const { GraphQLError } = require("graphql/error");
const { v1: uuid } = require("uuid");
const Person = require("./models/person");

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: "3d599470-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: "3d599471-3436-11e9-bc57-8b80ba54c431",
  },
];

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: (root, args) => {
      if (!args.phone) {
        // filters missing
        return Person.find({});
      }
      //   const byPhone = (p) => (args.phone === "YES" ? p.phone : !p.phone);
      //   return persons.filter(byPhone);
      return Person.find({ phone: { $exists: args.phone === "YES" } });
    },
    findPerson: (root, args) => Person.findOne({ name: args.name }),
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
  },

  Mutation: {
    addPerson: async (root, args) => {
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
      return person.save();
    },

    editNumber: async (root, args) => {
      const person = persons.findOne({ name: args.name });
      if (!person) {
        return null;
      }

      person.phone = args.phone;
      return person.save();
    },
  },
};

module.exports = resolvers;
