'use strict';

/**
 * @ngdoc function
 * @name faeriadecks2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the faeriadecks2App
 */
angular.module('faeriadecks2App')
	.controller('MainCtrl', function(Cards, Deck, $routeParams, $location) {
		var vm = this;

		vm.cards = Cards.get();
		vm.deck = [];
		vm.totalCards = 0;
		vm.deckName = '';
		vm.deckUrl = '';

		function getDeckCard(id) {
			var toRet;
			vm.deck.forEach(function(c) {
				if (c.id === id) {
					toRet = c;
				}
			});
			return toRet;
		}

		function removeDeckCard(id) {
			var toRet;
			vm.deck.forEach(function(c, i) {
				if (c.id === id) {
					toRet = i;
				}
			});
			vm.deck.splice(toRet, 1);
		}
		vm.add = function(card) {
			if (vm.totalCards === 30) { return; }
			var c = getDeckCard(card.id);
			if (c) {
				if (c.rarity === 'LEGENDARY') { return; }
				if (c.copies === 3) { return; }
				c.copies++;
				vm.totalCards++;
				return;
			}

			vm.deck.push({
				id: card.id,
				name: card.name,
				img: card.img,
				rarity: card.rarity,
				copies: 1
			});
			vm.totalCards++;
		};
		vm.remove = function(card) {
			var c = getDeckCard(card.id);
			c.copies--;
			vm.totalCards--;
			if (c.copies === 0) {
				removeDeckCard(c.id);
			}
		};

		var colorMap = {
			HUMAN: 1,
			BLUE: 2,
			GREEN: 3,
			RED: 4,
			YELLOW: 5
		};
		vm.colorOrder = function(color) {
			return colorMap[color];
		};

		vm.pad = function(num) {
			var str = String(num);
			while (str.length < 3) {
				str = 0 + str;
			}
			return str;
		};


		if ($routeParams.deckId) {
			Deck.get({deckId: $routeParams.deckId}).$promise.then(function(deck){
				vm.deckName = deck.name;
				vm.deckUrl = deck.url;
				vm.deck = deck.deck;
				var count = 0;
				vm.deck.forEach(function(card){
					count += card.copies;
				});
				vm.totalCards = count;
			}, function() {
				vm.error = 'Deck could not be found.';
			});
		}

		vm.save = function() {
			var d = new Deck({name: vm.deckName, deck: vm.deck});
			d.$save().then(function(deck){
				$location.path('/'+deck.url);
			});
		};

		vm.reset = function() {
			if ($routeParams.deckId) { $location.path('/'); }

			vm.deck = [];
			vm.totalCards = 0;
			vm.deckName = '';
			vm.deckUrl = '';
		};
	});