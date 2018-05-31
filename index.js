var http = require('http'); 
var fs = require('fs');
var path = require('path');

//modules
var albums = require('./models/albums');
const express = require('express');
var cors = require("cors");
var bodyParser = require("body-parser");
let handlebars =  require("express-handlebars");
var mongoose = require('mongoose');

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

{//begin express routes
 //remember to use arrow functions
   app.get('/', (req,res) =>{
       res.render('home');
   });
   
   app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page');
   });
   
   app.get('/getall', (req,res) => {
     //res.json(albums.getAllAlbums());
     // return all records
     albums.find(function(err, albums){
      res.send(albums);
     });
   });  
   
   //find specific item
   app.get('/get', (req,res,next) => {
    let result = albums.findOne(req.query.search_field);
    console.log(req.query);
     albums.findOne({title: req.query.search_field}, (err, item, next) => {
       if (err) return next(err);
       console.log(item);
       res.render('detail', {title: req.query.search_field, result: result });
       // other code here
     });
   });
   
   app.post('/get', (req,res) => {
    console.log(req.body.search_field);
    albums.findOne({name: req.body.search_field}, (err, item, next) => {
       if (err) return next(err);
       console.log(item);
       res.render('detail', {title: req.body.search_field, result: item });
       // other code here
     });
   });
   
   app.post('/add', (req,res) =>{
      let newItem = {
          name: req.body.name, 
          artist: req.body.artist,
          year: req.body.year,
          genre: req.body.genre
      };
      console.log(newItem);
      albums.create(newItem, (err, album) =>{
       console.log(album);
          if(err) return (err);
          return res.write(`${album} succesfully saved`);
      });
   });
   
   app.post('/delete', (req, res, next) => {
    let result = albums.deleteOne(req.query.bye);
    console.log(req.query);
     albums.deleteOne({name: req.query.bye}, (err, item, next) => {
       if (err) return next(err);
       console.log(item);
       res.send(`${item} has been deleted`);
       // other code here
     });
   });
   
   app.get('*', (req, res) => {
     res.status(404).send('what??? 404 page not found');
     
   });

}//end express routes

app.listen(app.get('port'), () => {
 console.log('Express started');
});


