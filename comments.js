// Create web server
// This file is the main file for the server
// It combines all the other files and starts the server
// It also sets up the web server to handle requests

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = require('./comments.js');
var static = require('node-static');
var file = new static.Server('./public');
var port = 8080;
var url = require('url');
var querystring = require('querystring');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var uri = url.parse(request.url).pathname;
  var filename = path.join(process.cwd(), uri);
  if (request.method === 'POST') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var post = querystring.parse(body);
      comments.addComment(post);
      response.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      response.end('post received');
    });
  } else {
    file.serve(request, response);
  }
});
// Listen on port 8080
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://