// server.js
// where your node app starts


var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors'); 
var mongoose = require('mongoose');
var path = require('path');
var mongodb = require('mongodb');
var dataStore = require('./dataStore');
var shortUrl = require('./models/shortUrl');
var app = express();

app.use(bodyParser.json());
app.use(cors());
// init project
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, 'public')));

 //http://expressjs.com/en/starter/basic-routing.html

mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
