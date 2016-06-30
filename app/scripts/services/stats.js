'use strict';

/**
 * @ngdoc service
 * @name faeriadecks2App.Stats
 * @description
 * # Stats
 * Service in the faeriadecks2App.
 */
angular.module('faeriadecks2App')
	.service('Stats', function Stats(Cards) {
		function singleAverageStat(stat, deck) {
			var amnt = 0;
			var cards = 0;
			deck.forEach(function(c) {
				var fullCard = Cards.getById(c.id);
				if (!fullCard) { console.log('find', c.id); return; }
				if (fullCard[stat]) {
					amnt += fullCard[stat] * c.copies;
					cards += c.copies;
				}
			});
			if (isNaN(amnt) || isNaN(cards) || !amnt || !cards) {
				return 0;
			}
			return Math.floor((amnt / cards) * 100) / 100;
		}

		function averageStat(stat, conditionalStat, value, deck) {
			//when we just pass a stat to avg and the deck
			if (typeof conditionalStat === 'object') { deck = conditionalStat; }

			var amnt = 0;
			var cards = 0;
			deck.forEach(function(c) {
				var fullCard = Cards.getById(c.id);
				if (!fullCard) { console.log('find', c.id); return; }
				if (!conditionalStat || fullCard[conditionalStat] === value) {
					amnt += fullCard[stat] * c.copies;
					cards += c.copies;
				}
			});
			if (isNaN(amnt) || isNaN(cards) || !amnt || !cards) {
				return 0;
			}
			return Math.floor((amnt / cards) * 100) / 100;
		}

		function countStatValue(stat, value, deck) {
			var cards = 0;
			deck.forEach(function(c) {

				var fullCard = Cards.getById(c.id);
				if (!fullCard) { console.log('find', c.id); return; }
				if (!value || fullCard[stat] === value) {
					cards += c.copies;
				}
			});
			if (isNaN(cards)) {
				return 0;
			}
			return cards;
		}

		function highestStat(stat, deck) {
			var highest = 0;
			deck.forEach(function(c) {
				var fullCard = Cards.getById(c.id);
				if (!fullCard) { console.log('find', c.id); return; }
				if (fullCard[stat] > highest) {
					highest = fullCard[stat];
				}
			});
			if (isNaN(highest)) {
				return 0;
			}
			return highest;
		}

		return {
			averageStat: averageStat,
			singleAverageStat: singleAverageStat,
			countStatValue: countStatValue,
			highestStat: highestStat
		};
	});