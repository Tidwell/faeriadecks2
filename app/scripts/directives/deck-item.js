'use strict';

/**
 * @ngdoc directive
 * @name faeriadecks2App.directive:deckItem
 * @description
 * # deckItem
 */
angular.module('faeriadecks2App')
	.directive('deckItem', function(Cards, User, Deck, $mdDialog) {
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

				scope.myVote = '';
				scope.vote = function(vote, url) {
					if (!scope.user.user || !scope.user.user.steamid) {
						return scope.showPopup();
					}
					
					if (vote === scope.myVote) {
						Deck.unvote({id: url}).$promise.then(function(d) {
							scope.deck = d;
						});
						scope.myVote = '';
						return;
					}
					scope.myVote = vote;
					Deck[vote]({id: url}).$promise.then(function(d) {
						scope.deck = d;
					});
				};
				scope.user = User.get();

				function fixVote() {
					if (scope.deck && scope.user.user && scope.user.user.steamid) {
						if (scope.deck.vote.negative.indexOf(scope.user.user.steamid) !== -1) {
							scope.myVote = 'downvote';
						}
						if (scope.deck.vote.positive.indexOf(scope.user.user.steamid) !== -1) {
							scope.myVote = 'upvote';
						}
					}
				}

				scope.$watch('user', fixVote);
				scope.$watch('deck', fixVote);


				scope.showPopup = function() {
					$mdDialog.show({
						templateUrl: '/views/vote-popup.html',
						parent: angular.element(document.body),
						clickOutsideToClose: true,
						fullscreen: false
					});
				};
			}
		};
	});