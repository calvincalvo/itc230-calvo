var http = require('http'); 
var fs = require('fs');
var path = require('path');

//modules
var albums = require('./albums');
const express = require('express');
var cors = require("cors");
var bodyParser = require("body-parser");
let handlebars =  require("express-handlebars");

const app = express();
app.set('port', process.env.PORT || process.env.IP);
//middleware
//does all work for turning/reading json files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(cors());
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

{
 //remember to use arrow functions
app.get('/', (req,res) =>{
    res.render('home');
});

app.get('/about', (req, res) => {
 res.type('text/plain');
 res.send('About page');
});

app.get('/getall', (req,res) => {
  res.json(albums.getAllAlbums());
});  

app.get('/get', (req,res) => {
 let result = albums.findTitle(req.query.search_field);
 res.render('detail', {Title: req.query.search_field, result: result });
 console.log(req.query);
});

app.post('/get', (req,res) => {
 let result = albums.findTitle(req.body.search_field);
 res.render('detail', {Title: req.body.search_field, result: result });
});

app.get('/delete', (req, res, next) => {
 //res.type('text/plain');
  albums.delete({title: req.query.title}, (err, result) => {
  let deleted = result;
  if(err) return next(err);
  res.type('text/html');
  res.render('delete', { title: req.query.title, deleted: deleted});
 });
});

app.get('*', (req, res) => {
  res.send('what??? 404 page not found', 404);
  
});

}

app.listen(app.get('port'), () => {
 console.log('Express started');
});


