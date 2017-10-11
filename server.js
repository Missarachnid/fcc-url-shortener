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

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

//var MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;

//mongoose.connect(MONGODB_URI, {
  //useMongoClient: true
//});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
  
});


app.get('/new/:urlToShorten(*)', (req, res)=>{
    var {urlToShorten} = req.params;
    //return res.json(urlToShorten);
    
    //var regex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

  
    if(regex.test(urlToShorten) === true){
        return res.json("Works");
    }else{
        return res.json("Fails");
    }
  
    
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
