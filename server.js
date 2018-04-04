// server.js
// where your node app starts


var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors'); 
var mongoose = require('mongoose');
var path = require('path');
var mongodb = require('mongodb');
var shortUrl = require('./models/shortUrl');

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});