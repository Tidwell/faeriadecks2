'use strict';

/**
 * @ngdoc function
 * @name faeriadecks2App.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the faeriadecks2App
 */
angular.module('faeriadecks2App')
	.controller('RootCtrl', function(User, $timeout, $mdSidenav) {
		this.user = User.get();
		var vm = this;
		this.toggleLeft = buildDelayedToggler('left');

		this.close = function() {
			console.log('close')
			vm.toggleLeft();
			
		};

		function debounce(func, wait, context) {
	      var timer;
	      return function debounced() {
	        var context = vm,
	            args = Array.prototype.slice.call(arguments);
	        $timeout.cancel(timer);
	        timer = $timeout(function() {
	          timer = undefined;
	          func.apply(context, args);
	        }, wait || 10);
	      };
	    }
	    /**
	     * Build handler to open/close a SideNav; when animation finishes
	     * report completion in console
	     */
	    function buildDelayedToggler(navID) {
	      return debounce(function() {
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	          });
	      }, 200);
	    }
	    function buildToggler(navID) {
	      return function() {
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	          });
	      }
	    }
	});