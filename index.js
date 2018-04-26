var http = require('http');
var fs = require("fs");
var films = require('./albums');

http.createServer(function(req, res){
    var path = req.url.toLowerCase();
  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Home page');
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About page');
      break;
    case '/getall':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("My favorite albums are " + JSON.stringify(films.getAllAlbums()));
      res.end();
      break;
    case '/get':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("You searched for Daisy " + JSON.stringify(films.findName('Daisy')));
      res.end();
      break;
    case '/delete':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write("You deleted Daisy " + JSON.stringify(films.albumDeleted()));
      res.end();
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 Not found');
      break;
    }
}).listen(3000);
