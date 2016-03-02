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
		var DeckResource = $resource('http://localhost:8080/api/decks/:deckId', {
			deckId: '@id'
		});

		return DeckResource;
	});