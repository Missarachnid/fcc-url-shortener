// Url Shortener project Free Code Camp

//requirements
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const mongoose = require('mongoose');
const path = require('path');
const mongodb = require('mongodb').MongoClient;
const shortUrl = require('./models/shortUrl');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//connect to the MLab database
const uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
const projectUrl = 'https://momentous-trick.glitch.me/';    


mongoose.connect(uri).then((err, res) => {
  if(err){
    console.log(err);
  }else{
    console.log('connected');
  }
});



//display the initial view
app.use(express.static('public'));


//retrieve the string entered after /new/ in the url
app.get(('/new/:toShort(*)'), (req, res, next) => {
  let {toShort} = req.params;
  const valid = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  
  if(valid.test(toShort) === true){

    shortUrl.findOne({'originalUrl': toShort}, (err, resData) => {
      if(err){
        console.log(err);
      }
      if(resData === null){
        let num = Math.floor(Math.random() * 100000).toString();
        let data = new shortUrl(
          {
          originalUrl: toShort,
          shortenedUrl: num,
          });
      data.save(err => {
        if(err){
          console.log('error saving to DB');
        } else {
          res.send({originalUrl: toShort, shortenedUrl: num});
        }
      });
    
    }else{
      //console.log('this already exists');
      //console.log(resData.originalUrl);
      res.send({originalUrl: resData.originalUrl, shortenedUrl: resData.shortenedUrl});
    }
       
    });
      
  }else{
    res.send('Failed to Shorten, please structure as a proper url.');
  }
});






// listen for requests :)
var listener = app.listen('3000', function () {
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