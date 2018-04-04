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

//display the initial view
app.use(express.static('public'));

//retrieve the string entered after /new/ in the url
app.get(('/new/toShort(*)'), (req, res, next) => {
var {toShort} = req.params;
  console.log(toShort);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});