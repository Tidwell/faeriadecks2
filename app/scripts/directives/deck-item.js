'use strict';

/**
 * @ngdoc directive
 * @name faeriadecks2App.directive:deckItem
 * @description
 * # deckItem
 */
angular.module('faeriadecks2App')
	.directive('deckItem', function(Cards, User, Deck, $cookies) {
		return {
			templateUrl: '/views/deck-item.html',
			restrict: 'E',
			replace: true,
			scope: {
				deck: '=',
				showCopy: '='
			},
			link: function postLink(scope, element, attrs) {
				Cards.get();
				scope.getColors = function(deck) {
					if (!deck || !deck.deck) { return []; }
					var colors = [];
					deck.deck.forEach(function(c){
						var card = Cards.getById(c.id);
						if (!card) { console.log('find', c.id); return []; }
						if (colors.indexOf(card.color) === -1 && card.color) {
							colors.push(card.color);
						}
					});
					return colors;
				};
				scope.hasRated = function(url) {
					if ($cookies.get(url)) { return true; }
					return false;
				};

				var typeMap = {
					YELLOW: 'deserts',
					BLUE: 'islands',
					GREEN: 'forests',
					RED: 'mountains'
				};
				scope.maxColors = function(color,deck) {
					if (!deck || !deck.deck) { return 0; }
					var curMax = 0;
					deck.deck.forEach(function(c){
						var card = Cards.getById(c.id);
						if (!card) { console.log('find', c.id); return 0; }
						if (card.color && card.color === color && typeMap[color] && card[typeMap[color]] > curMax) {
							curMax = card[typeMap[color]];
						}
					});
					return curMax;
				};

				scope.submitRating = function(rate, url) {
					Deck.rate({
						rating: rate,
						id: url
					}).$promise.then(function(){
						$cookies.put(url, rate);
					});
				};
				scope.user = User.get();
			}
		};
	});