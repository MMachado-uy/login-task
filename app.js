/**
 * Server entry point
 * @since   Feb 2017
 * @author  Mauricio Machado <mauricio.machado@modelit.xyz>
 **/

 /* Env variables */
require('dotenv').config();

/* Dependencies */
var cache   = require('memory-cache');
var express = require('express');
var http    = require('http');
var mongo   = require('mongodb');

/* App Variables */
var app = express();
var routes = require('./server/routes');
app.use(express.static(__dirname + '/public'));
app.listen(80, function() {
    console.log("Hey, I'm running @ port 80!");
});

routes(app, cache);
