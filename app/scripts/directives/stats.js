'use strict';

/**
 * @ngdoc directive
 * @name faeriadecks2App.directive:stats
 * @description
 * # stats
 */
angular.module('faeriadecks2App')
	.directive('stats', function(Stats) {
		return {
			templateUrl: '/views/stats.html',
			restrict: 'E',
			scope: {
				deck: '='
			},
			link: function postLink(scope, element, attrs) {
				if (!scope.deck) { scope.deck = []; }
				for (var prop in Stats) {
					(function(prop){
						scope[prop] = function() {
							var args = Array.prototype.slice.call(arguments);
							args.push(scope.deck);
							return Stats[prop].apply(null, args);
						}
					}(prop));
				}
			}
		};
	});