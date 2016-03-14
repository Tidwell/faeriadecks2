angular.module('faeriadecks2App').filter('typeFilter', function() {
	return function(cards, typeFilters) {

		var toRet = [];
		if (!cards || !typeFilters) {
			return toRet;
		}
		cards.forEach(function(c) {
			if (typeFilters[c.type.toLowerCase()]) {
				toRet.push(c);
			}
		});
		return toRet;
	};
});
