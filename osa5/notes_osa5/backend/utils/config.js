require("dotenv").config();

// const PORT = 27017;
const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.MONGODB_URI_NOTEAPP_TEST
    : process.env.MONGODB_URI_NOTEAPP;

module.exports = {
  MONGODB_URI,
  PORT,
};
