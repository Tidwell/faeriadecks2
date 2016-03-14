angular.module('faeriadecks2App').filter('fullDecks', function(Cards) {
	function deckCardCount(deck) {
		var total = 0;
		deck.deck.forEach(function(c) {
			total += c.copies
		});
		return total;
	}
	return function(decks) {
		if (!decks) { return decks; }
		var toRet = [];
		decks.forEach(function(deck) {
			if (deckCardCount(deck) == 30) {
				toRet.push(deck);
			}
		});
		return toRet;
	}
});