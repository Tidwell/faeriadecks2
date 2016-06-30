'use strict';

/**
 * @ngdoc function
 * @name faeriadecks2App.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the faeriadecks2App
 */
angular.module('faeriadecks2App')
	.controller('HomepageCtrl', function(Deck, Cards, DiscusComments, User, $scope) {
		var vm = this;
		this.recentDecks = Deck.list();
		this.topDecks = Deck.topList();
		$scope.user = User.get();

		$scope.$watch('user', function() {
			if ($scope.user && $scope.user.user && $scope.user.user.steamid && !vm.myDecks) {
				Deck.byUser({
					steamid: $scope.user.user.steamid
				}).$promise.then(function(data) {
					vm.myDecks = data;
				});
			}
		});


		DiscusComments.onPromises([this.recentDecks.$promise, this.topDecks.$promise]);
		this.cards = Cards.get();

		this.getById = function(cardId) {
			var toRet;
			if (!this.cards || !this.cards.cards) { return {}; }
			this.cards.cards.forEach(function(c){
				if (c.id === cardId) {
					toRet = c;
				}
			});
			return toRet;
		};
	});