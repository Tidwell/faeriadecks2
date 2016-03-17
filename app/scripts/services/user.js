'use strict';

/**
 * @ngdoc service
 * @name faeriaUsers2App.User
 * @description
 * # User
 * Service in the faeriadecks2App.
 */
angular.module('faeriadecks2App')
	.service('User', function User($http) {
		var prefix = 'http://localhost:9005'; //http://localhost:9005'
		var user = {};

		return {
			get: function() {
				if (!user.user) { $http.get(prefix + '/account').then(function(data){ user.user = data.data.user._json; }); }
				return user;
			}
		};
	});