var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  author: String,
  text: String
});

module.exports = mongoose.model('Quote', QuoteSchema);
