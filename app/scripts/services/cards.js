'use strict';

/**
 * @ngdoc service
 * @name faeriadecks2App.Cards
 * @description
 * # Cards
 * Service in the faeriadecks2App.
 */
angular.module('faeriadecks2App')
	.service('Cards', function Cards($http, $sce) {
		var c = {};

		function countLands(card) {
			return card.deserts + card.mountains + card.islands + card.forests;
		}

		return {
			get: function() {
				if (!c.cards) {
					$http.get('/scripts/output.json').then(function(data) {
						var d = data.data;
						d.forEach(function(c){
							c.text = c.text.replace(/\{/g, '<strong>');
							c.text = c.text.replace(/\}/g, '</strong>');
							c.text = c.text.replace(/\_/g, ' ');
							c.text = c.text.replace(/\|/g, ' ');
							c.text = $sce.trustAsHtml(c.text);
							c.landCount = countLands(c);
						});
						c.cards = d;
					});
				}
				return c;
			},
			getById: function(id) {
				if (!c.cards) { return {}; }
				var toRet;
				c.cards.forEach(function(card){
					if (card.id === id) { toRet = card; }
				});
				return toRet;
			}
		};
	});