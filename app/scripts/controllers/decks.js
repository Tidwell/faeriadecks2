'use strict';

/**
 * @ngdoc function
 * @name faeriadecks2App.controller:DecksCtrl
 * @description
 * # DecksCtrl
 * Controller of the faeriadecks2App
 */
angular.module('faeriadecks2App')
	.controller('DecksCtrl', function(Deck, Cards, $timeout, DiscusComments) {
		var vm = this;
		this.recentDecks = Deck.list();

		DiscusComments.onPromises([this.recentDecks.$promise]);

		this.cards = Cards.get();

		vm.colorFilters = {
			HUMAN: true,
			GREEN: true,
			YELLOW: true,
			BLUE: true,
			RED: true
		};
		vm.perPage = 30;
		vm.sort = 'voteScore';
		vm.includeUntitled = true;
	});