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

async function connectDB() {
  try {
    await client.connect();
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error.message);
    throw error;
  }
}

connectDB();

module.exports = {
  client
};
