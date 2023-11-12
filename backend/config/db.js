const mysql = require('mysql');
require('dotenv/config');

/**
 * Create a connection pool for MySQL database.
 * The pool configuration is set using environment variables.
 */
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  socketPath: process.env.DB_SOCKETPATH,
});

module.exports = pool;

