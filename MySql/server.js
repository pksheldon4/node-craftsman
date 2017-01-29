'use strict';

var mysql = require('mysql');
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var connectionInfo = {
    host: 'localdocker',
    user: 'root',
    password: 'admin123',
    database: 'node'
};

http.createServer(handleRequest).listen(8888);

function handleRequest(request, response) {

    var pageContent = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' +
        'content="text/html; charset=UTF-8"/>' +
        '</head>' +
        '<body>' +
        '<form action="/add" method="post">' +
        '<input type="text" name="content">' +
        '<input type="submit" value="Add content" />' +
        '</form>' +
        '<div>' +
        '<strong>Content in database:</strong>' +
        '<pre>' +
        'DBCONTENT' +
        '</pre>' +
        '</div>' +
        '<form action="/" method="get">' +
        '<input type="text" name="q">' +
        '<input type="submit" value="Filter content" />' +
        '</form>' +
        '</body>' +
        '</html>';

    var pathname = url.parse(request.url).pathname;
    if (pathname == '/add') {
        var requestBody = '';
        var postParameters;
        request.on('data', function(data) {
            requestBody += data;
        });
        request.on('end', function() {
            postParameters = querystring.parse(requestBody);
            addContentToDatabase(postParameters.content, function() {
                response.writeHead(302, {
                    'Location': '/'
                });
                response.end();
            })
        });
    } else {
        var filter = querystring.parse(url.parse(request.url).query).q;
        getContentsFromDatabase(filter, function(contents) {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write(pageContent.replace('DBCONTENT', contents));
            response.end();
        });
    }

    function getContentsFromDatabase(filter, callback) {
        var connection = mysql.createConnection(connectionInfo);

        var query;
        var resultAsString = '';

        if (filter) {
            query = connection.query('SELECT id, content FROM test ' +
                'WHERE content like "' +
                filter + '%"');
        } else {
            query = connection.query('SELECT id, content FROM test');
        }

        query.on('error', function(err) {
            console.log('A database error occured:');
            console.log(err);
        });
        query.on('result', function(result) {
            resultAsString += 'id:' + result.id;
            resultAsString += 'content:' + result.content;
            resultAsString += '\n';
        });
        query.on('end', function(result) {
            connection.end();
            callback(resultAsString);
        });
    }

    function addContentToDatabase(content, callback) {
        var connection = mysql.createConnection(connectionInfo);
        connection.query('INSERT INTO test (content)' +
            'VALUES ("' + content + '")',
            function(err) {
                if (err) {
                    console.log('Could not insert content "' +
                        content +
                        '" into database.');
                }
                callback();
            });
    }
}
