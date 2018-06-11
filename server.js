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
require('dotenv').config();
//connect to the MLab database
const uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
const projectUrl = 'https://momentous-trick.glitch.me/';    

//display the initial view
app.use(express.static('public'));

//Start Mongodb through mongoose
mongoose.connect(uri).then((err, res) => {
  if(err){
    console.log(err);
  }
});

app.get('/:newUrl', (req, res) => {
  let {newUrl} = req.params;
  console.log("New url" , newUrl);
  shortUrl.findOne({shortenedUrl: newUrl}, (err, data) => {
    if(err) {
      res.send("There was an error. Please refresh and try again.");
    } else if(data === null) {
      res.send("This url was not shortened. Please enter another url.");
    } else {
      let temp = data.originalUrl;
      console.log("This is the url", temp);
      res.redirect(301, temp);
    }
  });

});

//retrieve the string entered after /new/ in the url
app.get(('/new/:toShort(*)'), (req, res, next) => {
  let {toShort} = req.params;
  const valid = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  //test if it passes the regex
  if(valid.test(toShort) === true){
    //If it is formatted right, then we check to see if it already exists in the collection
    shortUrl.findOne({'originalUrl': toShort}, (err, resData) => {
      if(err){
        res.send('There was an error with the database. Please refresh and try again.');
      }else if (resData === null){
        //findOne returns null for no entries, so then we can save the entry
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
            res.send({originalUrl: toShort, shortenedUrl: projectUrl + num});
          }
        });
    }else{
      console.log("resData", resData);
      res.send({originalUrl: resData.original, shortenedUrl: resData.shortenedUrl});
    }
  });
      
  }else{
  //The url was not formatted correctly
    res.send('Failed to Shorten, please structure as a proper url.');
  }
});

// listen for requests :)
var listener = app.listen('3000', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
