'use strict'

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localdocker:27017/accounting', function(err, connection) {
    var collection = connection.collection('customers');
    collection.insert({'name': 'Jane Doe'},
        function(err, count) {
            console.log('Inserted', count, 'documents');
            collection.find().toArray(function(err, documents) {
                console.dir(documents);
                connection.close();
            })
        })
});
