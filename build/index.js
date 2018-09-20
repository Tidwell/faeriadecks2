var config = require('./src/config');
var port = process.env.PORT || 9005; // set our port

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');
var spa = require('express-spa');

var path = require('path');

app.use(express.static(path.join(__dirname , config.appDir)));

if (config.localConfigFunc) {
	config.localConfigFunc(app);
}

var mongoose   = require('mongoose');
mongoose.connect(config.mongo); // connect to our database
var Deck = require('./src/deck-model');

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


router.get('/decks/top', function(req, res) {
	var q = Deck.find({}, {}, { sort: { 'created' : -1 } })
	q.limit(800).exec(function(err,decks){
		if (err) { return res.sendStatus(400).send(err); }
		return res.json(decks);
	});
});

router.post('/decks/:url/rate/:rating', function(req,res){
	if (!req.params.url || !req.params.rating) { return res.sendStatus(400); }

	Deck.findOne({url: req.params.url}, function(err,deck){
		if (err || !deck) { return res.sendStatus(404); }
		deck.addRating(Number(req.params.rating));
		deck.save(function(err,deck){
			if (err || !deck) { return res.sendStatus(404); }
			res.json(deck);
		});
	});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.sendStatus(400);
}
router.post('/decks/:url/upvote', ensureAuthenticated, function(req,res){
	if (!req.params.url) { return res.sendStatus(400); }

	Deck.findOne({url: req.params.url}, function(err,deck){
		if (err || !deck) { return res.sendStatus(404); }
		deck.upvote(req.user.id);
		deck.save(function(err,deck){
			if (err || !deck) { return res.sendStatus(404); }
			res.json(deck);
		});
	});
});
router.post('/decks/:url/downvote', ensureAuthenticated, function(req,res){
	if (!req.params.url) { return res.sendStatus(400); }

	Deck.findOne({url: req.params.url}, function(err,deck){
		if (err || !deck) { return res.sendStatus(404); }
		deck.downvote(req.user.id);
		deck.save(function(err,deck){
			if (err || !deck) { return res.sendStatus(404); }
			res.json(deck);
		});
	});
});
router.post('/decks/:url/unvote', ensureAuthenticated, function(req,res){
	if (!req.params.url) { return res.sendStatus(400); }

	Deck.findOne({url: req.params.url}, function(err,deck){
		if (err || !deck) { return res.sendStatus(404); }
		deck.unvote(req.user.id);
		deck.save(function(err,deck){
			if (err || !deck) { return res.sendStatus(404); }
			res.json(deck);
		});
	});
});

router.get('/decks/by/:steamid', function(req, res) {
	Deck.find({'author.steamId': req.params.steamid}, function(err,decks){
		if (err || !decks) { return res.sendStatus(404); }
		res.json(decks);
	});
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/decks/:url', function(req, res) {
	Deck.findOne({url: req.params.url}, function(err,deck){
		if (err || !deck) { return res.sendStatus(404); }
		res.json(deck);
	});
});

router.post('/decks', function(req, res) {
	if (!req.body.deck.length) { return res.sendStatus(400); }

	var d = new Deck(req.body);
	if (req.user) {
		d.author = {
			steamId: req.user.id,
			name: req.user.displayName,
			image: req.user._json.avatarmedium
		};
	}

	d.save(function(err,deck){
		if (err || !deck) { return res.sendStatus(404); }
		res.json(deck);
	});
});

router.post('/decks/:url', function(req, res) {
	if (!req.body.deck.length || !req.params.url || !req.user) { return res.sendStatus(400); }

	Deck.findOne({url:req.params.url}, function(err,deck){
		if (err || !deck) { return res.sendStatus(404); }
		if (deck.author.steamId !== req.user.id) {
			return res.sendStatus(400).send('You dont own that deck.');
		}
		deck.deck = req.body.deck;
		deck.name = req.body.name;
		deck.notes = req.body.notes;
		deck.created = Date.now();

		deck.author.name = req.user.displayName;
		deck.author.image = req.user._json.avatarmedium;

		deck.save(function(err,deck){
			if (err || !deck) { return res.sendStatus(404); }
			res.json(deck);
		});

	});
});


router.get('/decks', function(req, res) {
	var q = Deck.find({}, {}, { sort: { 'created' : -1 } })
	q.limit(800).exec(function(err,decks){
		if (err) { return res.sendStatus(400).send(err); }
		return res.json(decks);
	});
});

router.get('/cardsearch/:card', require('./src/card-search.js'));

// more routes for our API will happen here

//configure the auth routes
require('./src/auth')(app);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.use(spa(config.indexFile));


// START THE SERVER
// =============================================================================
app.listen(port);
process.on('uncaughtException', function (err) {
    console.log('exception', err); // err.message is "foobar"
});
console.log('Magic happens on port ' + port);
