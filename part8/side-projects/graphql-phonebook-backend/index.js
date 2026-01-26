require("dotenv").config();

const connectToDatabase = require("./db"); //db
const startServer = require("./server"); // apollo server

const MONGODB_URI = process.env.MONGODB_URI; //db
const PORT = process.env.PORT || 4000; // apollo server

const main = async () => {
  await connectToDatabase(MONGODB_URI); //db
  startServer(PORT); // apollo server
};

main();
