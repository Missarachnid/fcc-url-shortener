var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
    originalUrl: String,
    shorterUrl: String}, 
    {timestamps:true});

var ModelClass = mongoose.model('url-short', urlSchema);

module.exports = ModelClass;