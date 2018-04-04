// Url Shortener project Free Code Camp

//requirements
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors'); 
var mongoose = require('mongoose');
var path = require('path');
var mongodb = require('mongodb').MongoClient;
var shortUrl = require('./models/shortUrl');

var app = express();
app.use(bodyParser.json());
app.use(cors());

//connect to the MLab database
const uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;
                     

//display the initial view
app.use(express.static('public'));

//retrieve the string entered after /new/ in the url
app.get(('/new/:toShort(*)'), (req, res, next) => {
  let {toShort} = req.params;
  const valid = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)?/gi;
  
  
  
  if(valid.test(toShort) === true){
    //let num = Math.floor(Math.random() * 100000).toString();
    
    //const data = new shortUrl(
    //{
    //originalUrl: toShort,
    //shortenedUrl: num,
    //}
  //);
    res.json({url: 'worked'});
  }else{
    res.json({urlToShorten: 'Failed'});
  }
});






// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



//I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
//If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
//When I visit that shortened URL, it will redirect me to my original link

//is url valid?
//has url been entered before?
//search for url

//app.get for initial entry of url to be shortened
//app.get for new website they are going to