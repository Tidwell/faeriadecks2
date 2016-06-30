'use strict';

/**
 * @ngdoc directive
 * @name faeriadecks2App.directive:deckItem
 * @description
 * # deckItem
 */
angular.module('faeriadecks2App')
	.directive('deckItem', function(Cards, User, Deck, $mdDialog, DeckColor) {
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
				
				scope.getColors = DeckColor.deckColors;

				scope.hasRated = function(url) {
					if ($cookies.get(url)) { return true; }
					return false;
				};

				
				scope.maxColors = DeckColor.maxOfColor;

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
					if (scope.deck && scope.user.user && scope.user.user.steamid && scope.deck && scope.deck.vote) {
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