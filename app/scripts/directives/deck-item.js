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
				}

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