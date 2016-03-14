angular.module('faeriadecks2App').filter('colorFilter', function() {
	return function(cards, colorFilters) {

		var toRet = [];
		if (!cards || !colorFilters) {
			return toRet;
		}
		cards.forEach(function(c) {
			if (colorFilters[c.color.toLowerCase()]) {
				toRet.push(c);
			}
		});
		return toRet;
	};
});