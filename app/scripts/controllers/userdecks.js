'use strict';

/**
 * @ngdoc function
 * @name faeriadecks2App.controller:UserdecksCtrl
 * @description
 * # UserdecksCtrl
 * Controller of the faeriadecks2App
 */
angular.module('faeriadecks2App')
	.controller('UserdecksCtrl', function(Deck, $routeParams, DiscusComments) {
		var vm = this;
		vm.deckId = $routeParams.steamid
		if (vm.deckId) {
			Deck.byUser({
				steamid: $routeParams.steamid
			}).$promise.then(function(data) {
				vm.decks = data;
				DiscusComments.load();
			}, function() {
				vm.error = 'User could not be found.';
			});
		} else {
			vm.error = 'No user specified.'
		}
	});