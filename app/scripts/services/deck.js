'use strict';

/**
 * @ngdoc service
 * @name faeriadecks2App.Deck
 * @description
 * # Deck
 * Service in the faeriadecks2App.
 */
angular.module('faeriadecks2App')
	.service('Deck', function Deck($resource) {
		var prefix = 'http://localhost:9005'; //http://localhost:9005'
		var DeckResource = $resource(prefix + '/api/decks/:deckId', {
			deckId: '@id',
			rating: '@rating',
			steamid: '@steamid'
		}, {
			list: { method: 'GET', isArray: true },
			topList: { method: 'GET', isArray: true, url: prefix + '/api/decks/top' },
			rate: { method: 'POST', url: prefix + '/api/decks/:deckId/rate/:rating' },
			byUser: { method: 'GET', isArray: true, url: prefix + '/api/decks/by/:steamid'}
		});

		return DeckResource;
	});