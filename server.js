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

// middleware to use for all requests
router.use(function(req, res, next) {
  console.log('Oh snap, something is happening');
  next();
});

// test route to make sure it's working
router.get('/', function(req, res) {
  res.json({ message: "yays, it's working!" });
});

// routes that end in /quotes
router.route('/quotes')

  // create a quote (accessed at POST http://localhost:8080/api/quotes)
  .post(function(req, res) {

    var quote = new Quote(); // create a new instance of Quote
    quote.text = req.body.text; // set the quote

    // save the quote and check for errors
    quote.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Quote created!'});
    });
  })

  // get all quotes (accessed at GET http://localhost8080/api/quotes)
  .get(function(req, res) {
    Quote.find(function(err, quotes) {
      if (err)
        res.send(err);

      res.json(quotes);
    });
  });

// register routes
app.use('/api', router);

// start the server
app.listen(port);
console.log('Listening at ' + port);
