'use strict';

var DBWrapper = require('node-dbi').DBWrapper;

var dbWrapper = new DBWrapper('sqlite3', {'path': '/home/prestonx/sqlite3/db/keyword-wrangler.test.sqlite'});

dbWrapper.connect();
module.exports = dbWrapper;
