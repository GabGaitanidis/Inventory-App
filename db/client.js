require("dotenv").config();
const { Pool } = require("pg");

const client = new Pool({
  connectionString: process.env.DTURL + "?sslmode=require",
});

client
  .connect()
  .then(() => console.log("Connected successfully"))
  .catch((e) => console.error("Connection error", e.stack));

module.exports = client;
