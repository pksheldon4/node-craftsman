'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localdocker',
    port: 3306,
    user: 'root',
    password: 'admin123',
    database: 'node'
});

var query = connection.query('SELECT id, content FROM test');
query.on('error', function(err) {
  console.log('A database error occured:');
  console.log(err);
});
query.on('fields', function(fields) {
  console.log('Received fields information.');
});
query.on('result', function(result) {
  console.log('Receive result:');
  console.log(result);
});
query.on('end', function() {
  console.log('Query execution has finished.');
  connection.end();
});
