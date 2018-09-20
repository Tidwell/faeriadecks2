'use strict';

/**
 * @ngdoc service
 * @name faeriadecks2App.Deckcolor
 * @description
 * # Deckcolor
 * Service in the faeriadecks2App.
 */
angular.module('faeriadecks2App')
	.service('DeckColor', function DeckColor(Cards) {
		var typeMap = {
			YELLOW: 'deserts',
			BLUE: 'islands',
			GREEN: 'forests',
			RED: 'mountains'
		};
		function getColors(deck) {
			if (!deck || !deck.deck) { return []; }
			var colors = [];
			deck.deck.forEach(function(c){
				var card = Cards.getById(c.id);
				if (!card) { return []; }

				for (var color in typeMap) {
					if (typeMap.hasOwnProperty(color)) {
						if (card[typeMap[color]] > 0 && colors.indexOf(color) === -1) {
							colors.push(color);
						}
					}
				}
			});
			return colors;
		}

		function maxOfColor(color,deck) {
			if (!deck || !deck.deck) { return 0; }
			var curMax = 0;
			deck.deck.forEach(function(c){
				var card = Cards.getById(c.id);
				if (!card) { return 0; }

				if (typeMap[color] && card[typeMap[color]] > curMax) {
					curMax = card[typeMap[color]];
				}
			});
			return curMax;
		}

		return {
			deckColors: getColors,
			maxOfColor: maxOfColor
		};
	});
