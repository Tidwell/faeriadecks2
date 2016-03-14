angular.module('faeriadecks2App').filter('deckColorFilter', function(Cards) {

	function getColors(deck) {
		if (!deck || !deck.deck) { return []; }
		var colors = [];
		deck.deck.forEach(function(c){
			var card = Cards.getById(c.id);
			if (colors.indexOf(card.color) === -1) {
				colors.push(card.color.toLowerCase());
			}
		});
		return colors;
	}

	return function(decks, colorFilters) {

		var toRet = [];
		if (!decks || !colorFilters) {
			return toRet;
		}
		decks.forEach(function(deck) {
			var colors = getColors(deck);
			var matches = true;
			colors.forEach(function(c){
				if (!colorFilters[c]) {
					matches = false;
				}
			});
			if (matches) { toRet.push(deck); }
		});
		return toRet;
	};
});