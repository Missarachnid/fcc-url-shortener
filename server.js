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
const uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;
const projectUrl = 'https://momentous-trick.glitch.me/';                     

//display the initial view
app.use(express.static('public'));

//retrieve the string entered after /new/ in the url
app.get(('/new/:toShort(*)'), (req, res, next) => {
  let {toShort} = req.params;
  const valid = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/gi;
  
  if(valid.test(toShort) === true){
    let num = Math.floor(Math.random() * 100000).toString();
    
    const data = new shortUrl(
      {
      originalUrl: toShort,
      shortenedUrl: num,
      }
    );
    mongodb.connect(uri, (err, db) => {
      if(err){
        console.log('unable to connect to server');
        res.send(err);
      } else {
        let num = Math.floor(Math.random() * 100000).toString();
        const data = {
          originalUrl: toShort,
          shortenedUrl: num
        };
        db.collection('+process.env.DB+').insert(data, (err, res) => {
          if(err) throw err;
          res.json({
            originalUrl: data.url,
            shortenedUrl: projectUrl + data.shortenedUrl
          });
        });
        console.log('success');
      }
         
    
    });
    //res.json({url: 'worked'});
  }else{
    res.json({urlToShorten: 'Failed, please refresh and try again.'});
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