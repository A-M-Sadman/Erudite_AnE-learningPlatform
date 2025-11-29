const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'erudite_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get a promise wrapped connection
const promisePool = pool.promise();

// Test connection
promisePool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to MySQL:', err);
  });

module.exports = promisePool;