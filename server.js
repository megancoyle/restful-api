// connect to database
var mongoose   = require('mongoose');
mongoose.connect("mongodb://localhost/api-test");

// call packages needed
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Quote = require('./app/models/quotes');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// routes for API
var router = express.Router();

// test route to make sure it's working
router.get('/', function(req, res) {
  res.json({ message: "yays, it's working!" });
});

// register routes
app.use('/api', router);

// start the server
app.listen(port);
console.log('Listening at ' + port);
