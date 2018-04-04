const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    originalUrl: String,
    shortenedUrl: String}, 
    {timestamps:true});

const ModelClass = mongoose.model('shortened', urlSchema);

module.exports = ModelClass;