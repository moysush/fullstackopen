require("dotenv").config();
const startServer = require("./server");
const connectToDB = require("./db");

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const main = async () => {
  await connectToDB(MONGODB_URI);
  startServer(PORT);
};

main();
