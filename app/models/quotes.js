var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  text: String
});

module.exports = mongoose.model('Quote', QuoteSchema);
