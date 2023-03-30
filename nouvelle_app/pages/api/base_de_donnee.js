const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost:3306',
    user: 'root',
    password: 'Foot3005',
    database: 'ttable_next'
  });

  module.exports = connection;