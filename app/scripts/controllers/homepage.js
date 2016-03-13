'use strict';

/**
 * @ngdoc function
 * @name faeriadecks2App.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the faeriadecks2App
 */
angular.module('faeriadecks2App')
	.controller('HomepageCtrl', function(Deck, Cards) {
		var vm = this;
		this.recentDecks = Deck.list();
		this.topDecks = Deck.topList();
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

		this.getColors = function(deck) {
			if (!deck || !deck.deck) { return []; }
			var colors = [];
			deck.deck.forEach(function(c){
				var card = vm.getById(c.id);
				if (colors.indexOf(card.color) === -1) {
					colors.push(card.color);
				}
			});
			return colors;
		};

		this.deckCardCount = function(deck) {
			var total = 0;
			deck.deck.forEach(function(c) {
				total += c.copies
			});
			return total;
		};
	});