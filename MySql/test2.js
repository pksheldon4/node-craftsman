'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localdocker',
    port: 3306,
    user: 'root',
    password: 'admin123'
});

connection.query(
  'CREATE DATABASE node ', function(err) {
    if (err) {
      console.log('Could not create a database "node".');
    }
});
connection.query('USE node', function(err) {
  if (err) {
      console.log('Could not switch to database "node"');
  }
});

connection.query('CREATE TABLE test ' +
      '(id INT(11) AUTO_INCREMENT, ' +
      ' content VARCHAR(255), ' +
      ' PRIMARY KEY(id))',
    function(err) {
      if (err) {
          console.log('Could not create table "test"');
      }
    }
);

connection.query('INSERT INTO test(content) VALUES ("Hello")');
connection.query('INSERT INTO test(content) VALUES ("World")');
connection.end();
