// Url Shortener project Free Code Camp
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

//connect to the MLab database
const uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;
mongodb.MongoClient.connect(uri, (err, db) => {
  
});
                          

//display the initial view
app.use(express.static('public'));

//retrieve the string entered after /new/ in the url
app.get(('/new/:toShort(*)'), (req, res, next) => {
  let {toShort} = req.params;
  const valid = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)?/gi;
  
  
  
  if(valid.test(toShort) === true){
    let num = Math.floor(Math.random() * 100000).toString();
    
    const data = new shortUrl(
    {
    originalUrl: toShort,
    shortenedUrl: num,
    }
  );
    data.save
  }else{
    res.json({urlToShorten: 'Failed'});
  }
});


mongodb.MongoClient.connect((uri, err, db) => {
  if(err) throw err;
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});