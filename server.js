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
    quote.author = req.body.author;
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

  // routes that end in /quotes/:quote_id
  router.route('/quotes/:quote_id')
    // get the quote with that id
    .get(function(req, res) {
      Quote.findById(req.params.quote_id, function(err, quote) {
        if (err)
          res.send(err);
        res.json(quote);
      });
    })

      // update the quote with this id
      .put(function(req, res) {

        // use quote model to find the quote we want to update
        Quote.findById(req.params.quote_id, function(err, quote) {

          if (err)
            res.send(err);
          quote.author = req.body.author;
          quote.text = req.body.text; // update quotes info

          // save quote
          quote.save(function(err) {
            if (err)
              res.send(err);

            res.json({ message: 'Quote updated!' });
          });
      });
    })

    .delete(function(req, res) {
      Quote.remove({
        _id: req.params.quote_id
      }, function(err, bear) {
        if (err)
          res.send(err);

        res.json({ message: 'Successfully deleted'});
      });
    });

// register routes
app.use('/api', router);

// start the server
app.listen(port);
console.log('Listening at ' + port);
