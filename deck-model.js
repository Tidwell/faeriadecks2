var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');


var DeckSchema = new Schema({
	name: String,
	url: {
		type: String,
		unique: true,
		'default': shortid.generate
	},
	deck: []
});


module.exports = mongoose.model('Deck', DeckSchema);