var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');

var rating = {type: Number, 'default': 0};

var DeckSchema = new Schema({
	name: String,
	url: {
		type: String,
		unique: true,
		'default': shortid.generate
	},
	deck: [{
		id: Number,
		name: String,
		copies: Number
	}],
	created: {
		type: Date,
		'default': Date.now
	},
	rating: {
		1: rating,
		2: rating,
		3: {type: Number, 'default': 1},
		4: rating,
		5: rating,
		average: {type: Number, 'default': 3}
	},
	notes: String,
	author: {
		steamId: String,
		name: String,
		image: String
	}
});

DeckSchema.methods.addRating = function(rating) {
	if (typeof rating !== 'number' || rating < 1 || rating > 5) { return false; }
	this.rating[rating]++;
	this.calculateAverage();
	return this.rating.average;
};

DeckSchema.methods.calculateAverage = function() {
	var r = this.rating;

	var numRatings = r[1] + r[2] + r[3] + r[4] + r[5];
	var total = (r[1]*1) + (r[2]*2) + (r[3]*3) + (r[4]*4) + (r[5]*5);
	
	if (!numRatings || !total) {
		this.rating.average = 0;
		return ;
	}

	//round to one dec. place
	this.rating.average = Math.round((total/numRatings)*10)/10;
};

var allowed = ['id', 'copies', 'name'];
DeckSchema.method('toJSON', function() {
	var deckData = this.toObject();
	deckData.deck.forEach(function(c) {
		for (var prop in c) {
			if (allowed.indexOf(prop) === -1) {
				delete c[prop];
			}
		}
	});
	return deckData;
});

module.exports = mongoose.model('Deck', DeckSchema);