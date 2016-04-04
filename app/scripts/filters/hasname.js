'use strict';

/**
 * @ngdoc filter
 * @name faeriadecks2App.filter:hasName
 * @function
 * @description
 * # hasName
 * Filter in the faeriadecks2App.
 */
angular.module('faeriadecks2App')
	.filter('hasName', function() {
		return function(decks) {
			var toRet = [];
			if (!decks || !decks.forEach) { return decks; }
			decks.forEach(function(d) {
				if (d.name) { toRet.push(d); }
			});
			return toRet;
		};
	});