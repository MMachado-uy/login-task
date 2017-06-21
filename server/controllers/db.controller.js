/**
 * MongoDB connection
 * @see      https://www.npmjs.com/package/mongodb
 * @since    Jun, 2017
 */

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
 
// Connection URL 
var url = 'mongodb://localhost:' + process.env.DB_URL;
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  db.close();
});