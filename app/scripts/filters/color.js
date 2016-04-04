//card color filter
angular.module('faeriadecks2App').filter('colorFilter', function() {
	return function(cards, colorFilters) {

		var toRet = [];
		if (!cards || !colorFilters) {
			return toRet;
		}
		cards.forEach(function(c) {
			if (!c || !c.color) {
				return;
			}
			if (colorFilters[c.color.toLowerCase()]) {
				toRet.push(c);
			}
		});
		return toRet;
	};
}).filter('newlines', function() {
	return function(text) {
		if (!text) {
			return text;
		}
		return text.replace(/(\r\n|\n|\r)/gm, '<br />');
	}
});