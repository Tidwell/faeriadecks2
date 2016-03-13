'use strict';

/**
 * @ngdoc function
 * @name faeriadecks2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the faeriadecks2App
 */
angular.module('faeriadecks2App')
	.controller('MainCtrl', function(Cards, Deck, $routeParams, $location, $cookies, $mdBottomSheet, $mdSidenav) {
		var vm = this;

		vm.hasRated = false;
		vm.cards = Cards.get();
		vm.deck = [];
		vm.totalCards = 0;
		vm.deckName = '';
		vm.deckUrl = '';

		vm.colorFilters = {
			human: true,
			green: true,
			yellow: true,
			blue: true,
			red: true
		};

		vm.typeFilters = {
			creature: true,
			event: true,
			structure: true
		};

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
			if (vm.totalCards === 30) {
				return;
			}
			var deckCard = getDeckCard(card.id);
			var c = Cards.getById(card.id);

			if (deckCard) {
				if (c.rarity === 'LEGENDARY') {
					return;
				}
				if (deckCard.copies === 3) {
					return;
				}
				deckCard.copies++;
				vm.totalCards++;
				return;
			}

			var newCard = {
				id: card.id,
				name: card.name,
				copies: 1
			};
			vm.deck.push(newCard);

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
			Deck.get({
				deckId: $routeParams.deckId
			}).$promise.then(function(deck) {
				vm.deckName = deck.name;
				vm.deckUrl = deck.url;
				vm.deck = deck.deck;
				vm.deckRating = deck.rating.average;
				var count = 0;
				vm.deck.forEach(function(card) {
					count += card.copies;
				});
				vm.totalCards = count;

				if ($cookies.get(vm.deckUrl)) { vm. hasRated = true; }
				//check cookie on load if rated
			}, function() {
				vm.error = 'Deck could not be found.';
			});
		}

		vm.save = function() {
			var d = new Deck({
				name: vm.deckName,
				deck: vm.deck
			});
			d.$save().then(function(deck) {
				$location.path('/' + deck.url);
			});
		};

		vm.reset = function() {
			if ($routeParams.deckId) {
				$location.path('/');
			}

			vm.deck = [];
			vm.totalCards = 0;
			vm.deckName = '';
			vm.deckUrl = '';
		};

		vm.submitRating = function(rate) {
			vm.hasRated = true;
			Deck.rate({
				rating: rate,
				id: vm.deckUrl
			}).$promise.then(function(){
				$cookies.put(vm.deckUrl, rate);
			});
		};

		vm.showDeck = function() {
			$mdSidenav('right')
				.toggle()
				.then(function() {
					
				});
		};
	});

angular.module('faeriadecks2App').filter('decklistOrder', function(Cards) {
	return function(deck) {
		deck.sort(function(cardA, cardB){
			var fullCardA = Cards.getById(cardA.id);
			var fullCardB = Cards.getById(cardB.id);
			if (fullCardA.faeriaCost > fullCardB.faeriaCost) {
				return 1;
			}
			if (fullCardA.faeriaCost === fullCardB.faeriaCost && fullCardA.name > fullCardB.name) {
				return 1;
			}
			return -1;
		});
		return deck;
	}
});

angular.module('faeriadecks2App').filter('colorFilter', function() {
	return function(cards, colorFilters) {

		var toRet = [];
		if (!cards || !colorFilters) {
			return toRet;
		}
		cards.forEach(function(c) {
			if (colorFilters[c.color.toLowerCase()]) {
				toRet.push(c);
			}
		});
		return toRet;
	};
});


angular.module('faeriadecks2App').filter('typeFilter', function() {
	return function(cards, typeFilters) {

		var toRet = [];
		if (!cards || !typeFilters) {
			return toRet;
		}
		cards.forEach(function(c) {
			if (typeFilters[c.type.toLowerCase()]) {
				toRet.push(c);
			}
		});
		return toRet;
	};
});
