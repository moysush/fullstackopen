const mongoose = require("mongoose");

const connectToDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("connected to database");
  } catch (error) {
    console.log("could not connect to database", error.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
