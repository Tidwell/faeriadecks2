var port = process.env.PORT || 9005; // set our port

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');
var spa = require('express-spa');

var path = require('path');
app.use(express.static(path.join(__dirname , './dist')));

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/faeriadecks2'); // connect to our database
var Deck = require('./deck-model');

app.use(spa(__dirname + '/dist/index.html'));

app.use(cors());
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/decks/:url', function(req, res) {
	Deck.findOne({url: req.params.url}, function(err,deck){
		if (err || !deck) { return res.sendStatus(404); }
		res.json(deck);
	});
});

router.post('/decks', function(req, res) {
	if (!req.body.deck.length) { return res.sendStatus(404); }
	var d = new Deck(req.body);

	d.save(function(err,deck){
		if (err || !deck) { return res.sendStatus(404); }
		res.json(deck);
	});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);