'use strict';

/**
 * @ngdoc service
 * @name faeriadecks2App.DiscusComments
 * @description
 * # DiscusComments
 * Service in the faeriadecks2App.
 */
angular.module('faeriadecks2App')
	.service('DiscusComments', function DiscusComments($timeout) {
		function load() {
			$timeout(function() { DISQUSWIDGETS.getCount({reset: true}); }, 1000)
		}
		function onPromises(promises) {
			var promiseCount = promises.length;
			var loaded = 0;
			promises.forEach(function(promise){
				promise.then(function() {
					loaded++;
					if (loaded === promiseCount) { load(); }
				});
			});
		}

		return {
			onPromises: onPromises,
			load: load
		};
	});