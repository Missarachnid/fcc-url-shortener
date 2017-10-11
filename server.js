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

    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  
    if(regex.test(urlToShorten) === true){
        return res.json(urlToShorten);
    }else{
        return res.json("Fails");
    }
  
    
});


/**/
if(experession.test(urlToShorten) === true){
    var short = Math.floor(Math.random() * 100000).toString();
    
    var data = new shortUrl({
      originalUrl: urlToShorten,
      shorterUrl: short
    });
    
    data.save(err=>{
      if(err){
        return res.send(err);
      }
    });
    
 //   var url = datastore.get("urls");
    //url.push(data);
    res.json(data);
  }
  var data = new shortUrl({
    originalUrl: urlToShorten,
    shorterUrl: 'InvalidUrl'
  })
  return res.json(data);
  //console.log(urlToShorten);
});

/**/



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
