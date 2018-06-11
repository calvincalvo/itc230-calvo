//models/albums.js
var mongoose = require('mongoose');

//remote db connection settings. For security, connectionString should be in a separate file not committed to git
var connectionString = "mongodb://calcal:avatar23@ds217360.mlab.com:17360/schoolio";
mongoose.connect(connectionString);
 
 var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define Book model in JSON key/value pairs
// values indicate the data type of each key
var albumSchema = new mongoose.Schema({
 name: { type: String, required: true },
 artist: String,
 year: String,
 genre: String
 
}); 

//creates model and makes it avalilable to the app
module.exports = mongoose.model('albums', albumSchema);
