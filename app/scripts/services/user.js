'use strict';

/**
 * @ngdoc service
 * @name faeriaUsers2App.User
 * @description
 * # User
 * Service in the faeriadecks2App.
 */
angular.module('faeriadecks2App')
	.service('User', function User($http, APIDomain) {
		var prefix = APIDomain;
		var user = {};
		var getting = false;

		return {
			get: function() {
				if (!user.user && !getting) {
					$http.get(prefix + '/account').then(function(data){ user.user = data.data.user._json; });
					getting = true;
				}
				return user;
			}
		};
	});