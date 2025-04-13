const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'wilayah-db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test koneksi
pool
  .getConnection()
  .then((connection) => {
    console.log('Database terhubung dengan sukses.');
    connection.release();
  })
  .catch((err) => {
    console.error('Error koneksi database:', err);
  });

module.exports = pool;
