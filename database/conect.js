require("dotenv").config();
const { Client } = require("pg");

const connectionData = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
};

const client = new Client(connectionData);
module.exports = {
  client,
};
