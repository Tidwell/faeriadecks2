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
			human: true,
			green: true,
			yellow: true,
			blue: true,
			red: true
		};
		vm.perPage = 30;
		vm.sort = 'rating.average';
	});