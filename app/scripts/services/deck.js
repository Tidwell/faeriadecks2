'use strict';

/**
 * @ngdoc service
 * @name faeriadecks2App.Deck
 * @description
 * # Deck
 * Service in the faeriadecks2App.
 */
angular.module('faeriadecks2App')
	.service('Deck', function Deck($resource, APIDomain, Cards, DeckColor) {
		function normalizeData(data) {
			data.forEach(function(deck){
				deck.colors = DeckColor.deckColors(deck);
				if (deck.metaVotes) {
					deck.voteScore = deck.metaVotes.upvotes-deck.metaVotes.downvotes;
				} else {
					deck.voteScore = 0;
				}
				if (!deck.created) {
					deck.created = 1456224170810;
				}
			});
			return data;
		}

		var DeckResource = $resource(APIDomain + '/api/decks/:deckId', {
			deckId: '@id',
			rating: '@rating',
			steamid: '@steamid'
		}, {
			list: { method: 'GET', isArray: true, transformResponse: [angular.fromJson, normalizeData] },
			topList: { method: 'GET', isArray: true, url: APIDomain + '/api/decks/top', transformResponse: [angular.fromJson, normalizeData] },
			upvote: { method: 'POST', url: APIDomain + '/api/decks/:deckId/upvote' },
			downvote: { method: 'POST', url: APIDomain + '/api/decks/:deckId/downvote' },
			unvote: { method: 'POST', url: APIDomain + '/api/decks/:deckId/unvote' },
			byUser: { method: 'GET', isArray: true, url: APIDomain + '/api/decks/by/:steamid', transformResponse: [angular.fromJson, normalizeData] }
		});

		return DeckResource;
	});