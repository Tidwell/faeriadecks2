var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var voting = require('./voting');

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
	notes: String,
	author: {
		steamId: String,
		name: String,
		image: String
	}
}, {
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
});

DeckSchema.virtual('cardCount').get(function() {
	var total = 0;
	this.deck.forEach(function(c) {
		total += c.copies;
	});
	return total;
});

var allowed = ['id', 'copies', 'name'];
DeckSchema.method('toJSON', function() {
	var deckData = this.toObject();
	delete deckData.rating;
	deckData.deck.forEach(function(c) {
		for (var prop in c) {
			if (allowed.indexOf(prop) === -1) {
				delete c[prop];
			}
		}
	});
	return deckData;
});
DeckSchema.plugin(voting);

DeckSchema.virtual('metaVotes').get(function() {
	var deck = this;
	return {
		upvotes: deck.upvotes(),
		downvotes: deck.downvotes(),
		total: deck.votes()
	};
});

module.exports = mongoose.model('Deck', DeckSchema);