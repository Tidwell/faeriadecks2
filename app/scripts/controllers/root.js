'use strict';

/**
 * @ngdoc function
 * @name faeriadecks2App.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the faeriadecks2App
 */
angular.module('faeriadecks2App')
	.controller('RootCtrl', function(User) {
		this.user = User.get();
	});