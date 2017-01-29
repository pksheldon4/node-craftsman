'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localdocker',
    port: 3306,
    user: 'nodetest',
    database: 'nodetest',
    password: 'nodetest'
});

connection.query(
    'select "foo" AS first_field, "bar" as second_field',
    // 'select ID, NAME, VALUE from TEST_1',
    function(err, results, fields) {
        if (err) {
            console.log('A database error occured!');
        } else {
            console.log(results);
        }
        connection.end();
    }
);
