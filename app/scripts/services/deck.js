'use strict';

/**
 * @ngdoc service
 * @name faeriadecks2App.Deck
 * @description
 * # Deck
 * Service in the faeriadecks2App.
 */
angular.module('faeriadecks2App')
	.service('Deck', function Deck($resource, APIDomain, Cards) {
		function getColors(deck) {
			if (!deck || !deck.deck) { return []; }
			var colors = [];
			deck.deck.forEach(function(c){
				var card = Cards.getById(c.id);
				if (!card) { console.log('find', c.id); return; }
				if (colors.indexOf(card.color) === -1 && card.color) {
					colors.push(card.color.toLowerCase());
				}
			});
			return colors;
		}

		function addColors(data) {
			data.forEach(function(deck){
				deck.colors = getColors(deck);
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
			list: { method: 'GET', isArray: true, transformResponse: [angular.fromJson, addColors] },
			topList: { method: 'GET', isArray: true, url: APIDomain + '/api/decks/top', transformResponse: [angular.fromJson, addColors] },
			upvote: { method: 'POST', url: APIDomain + '/api/decks/:deckId/upvote' },
			downvote: { method: 'POST', url: APIDomain + '/api/decks/:deckId/downvote' },
			unvote: { method: 'POST', url: APIDomain + '/api/decks/:deckId/unvote' },
			byUser: { method: 'GET', isArray: true, url: APIDomain + '/api/decks/by/:steamid', transformResponse: [angular.fromJson, addColors] }
		});

		return DeckResource;
	});