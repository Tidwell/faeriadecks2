'use strict';

/**
 * @ngdoc function
 * @name faeriadecks2App.controller:DeckviewCtrl
 * @description
 * # DeckviewCtrl
 * Controller of the faeriadecks2App
 */
angular.module('faeriadecks2App')
	.controller('DeckViewCtrl', function(Cards, Deck, $routeParams, $filter, DiscusComments) {
		var vm = this;
		vm.hasRated = false;

		if ($routeParams.deckId) {
			var dPromise = Deck.get({
				deckId: $routeParams.deckId
			}).$promise.then(function(deck) {
				vm.deck = deck;
				vm.deck.deck = $filter('decklistOrder')(vm.deck.deck);
				vm.disqusConfig.disqus_title = 'Deck: ' + vm.deck.name;
				DiscusComments.load();
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

		this.disqusConfig = {
			disqus_shortname: 'faeriadecks',
			disqus_identifier: $routeParams.deckId,
			disqus_url: 'http://www.faeriadecks.com/'+$routeParams.deckId,
			disqus_title: ''
		};
	});