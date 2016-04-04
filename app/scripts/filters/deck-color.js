angular.module('faeriadecks2App').filter('deckColorFilter', function(Cards) {
	return function(decks, colorFilters) {

		var toRet = [];
		if (!decks || !colorFilters) {
			return toRet;
		}
		decks.forEach(function(deck) {
			if (!deck || !deck.url) { return; }
			var matches = true;
			deck.colors.forEach(function(c){
				if (!colorFilters[c]) {
					matches = false;
				}
			});
			if (matches) { toRet.push(deck); }
		});
		return toRet;
	};
});