require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DTURL + "?sslmode=require",
});

client
  .connect()
  .then(() => console.log("Connected successfully"))
  .catch((e) => console.error("Connection error", e.stack));

module.exports = client;
