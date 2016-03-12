//http://codepen.io/TepigMC/pen/FIdHb

'use strict';

angular.module('faeriadecks2App').directive('starRating', function() {
	return {
		restrict: 'EA',
		template: '<ul class="star-rating" ng-class="{readonly: isReadonly}">' +
			'  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
			'    <i class="fa fa-star"></i>' + // or &#9733
			'  </li>' +
			'</ul>',
		scope: {
			ratingValue: '=ngModel',
			max: '=?', // optional (default is 5)
			onRatingSelect: '&?',
			isReadonly: '=?'
		},
		link: function(scope, element, attributes) {

			if (!scope.max) {
				scope.max = 5;
			}

			function updateStars() {
				scope.stars = [];
				for (var i = 0; i < scope.max; i++) {
					scope.stars.push({
						filled: i < scope.ratingValue
					});
				}
			}
			scope.toggle = function(index) {
				if (!scope.isReadonly) {
					scope.ratingValue = index + 1;
					if (!scope.onRatingSelect) { return; }
					scope.onRatingSelect({
						rating: index + 1
					});
				}
			};
			scope.$watch('ratingValue', function(oldValue, newValue) {
				updateStars();
			});
		}
	};
});