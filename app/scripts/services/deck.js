'use strict';

/**
 * @ngdoc service
 * @name faeriadecks2App.Deck
 * @description
 * # Deck
 * Service in the faeriadecks2App.
 */
angular.module('faeriadecks2App')
	.service('Deck', function Deck($resource, APIDomain) {
		var DeckResource = $resource(APIDomain + '/api/decks/:deckId', {
			deckId: '@id',
			rating: '@rating',
			steamid: '@steamid'
		}, {
			list: { method: 'GET', isArray: true },
			topList: { method: 'GET', isArray: true, url: APIDomain + '/api/decks/top' },
			rate: { method: 'POST', url: APIDomain + '/api/decks/:deckId/rate/:rating' },
			byUser: { method: 'GET', isArray: true, url: APIDomain + '/api/decks/by/:steamid'}
		});

		return DeckResource;
	});