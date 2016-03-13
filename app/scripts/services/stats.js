'use strict';

/**
 * @ngdoc service
 * @name faeriadecks2App.Stats
 * @description
 * # Stats
 * Service in the faeriadecks2App.
 */
angular.module('faeriadecks2App')
	.service('Stats', function Stats($resource) {
		function averageStat(stat, conditionalStat, value, deck) {
			//when we just pass a stat to avg and the deck
			if (typeof conditionalStat === 'object') { deck = conditionalStat; }

			var amnt = 0;
			var cards = 0;
			deck.forEach(function(c) {
				if (!conditionalStat || c[conditionalStat] === value) {
					amnt += c[stat] * c.copies;
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
				if (!value || c[stat] === value) {
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
				if (c[stat] > highest) {
					highest = c[stat];
				}
			});
			if (isNaN(highest)) {
				return 0;
			}
			return highest;
		}

		return {
			averageStat: averageStat,
			countStatValue: countStatValue,
			highestStat: highestStat
		};
	});