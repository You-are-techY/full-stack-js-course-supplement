const express = require('express');
const app = express();
const port = 3030;
const serveStatic = require('serve-static');
const path = require('path');

var finalhandler = require('finalhandler');
var http = require('http');
 
// Serve up public/ftp folder
var serve = serveStatic('public', { 'index': ['index.html', 'index.htm'] })
 
// Create server
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})
 
// Listen
server.listen(port);