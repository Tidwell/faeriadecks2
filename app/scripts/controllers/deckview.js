'use strict';

/**
 * @ngdoc function
 * @name faeriadecks2App.controller:DeckviewCtrl
 * @description
 * # DeckviewCtrl
 * Controller of the faeriadecks2App
 */
angular.module('faeriadecks2App')
	.controller('DeckViewCtrl', function(Cards, Deck, $routeParams, $cookies, $filter) {
		var vm = this;
		vm.hasRated = false;

		if ($routeParams.deckId) {
			Deck.get({
				deckId: $routeParams.deckId
			}).$promise.then(function(deck) {
				vm.deck = deck;
				vm.deck.deck = $filter('decklistOrder')(vm.deck.deck);
				if ($cookies.get(vm.deck.url)) { vm.hasRated = true; }
				//check cookie on load if rated
			}, function() {
				vm.error = 'Deck could not be found.';
			});
		}

		vm.cards = Cards.get();

		vm.pad = function(num) {
			var str = String(num);
			while (str.length < 3) {
				str = 0 + str;
			}
			return str;
		};

		vm.submitRating = function(rate) {
			vm.hasRated = true;
			Deck.rate({
				rating: rate,
				id: vm.deck.url
			}).$promise.then(function(){
				$cookies.put(vm.deck.url, rate);
			});
		};
	});