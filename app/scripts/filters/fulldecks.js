angular.module('faeriadecks2App').filter('fullDecks', function(Cards) {
	var countCache = {};

	function deckCardCount(deck) {
		var total = 0;
		deck.deck.forEach(function(c) {
			total += c.copies;
		});
		return total;
	}
	return function(decks) {
		if (!decks) {
			return decks;
		}
		var toRet = [];
		decks.forEach(function(deck) {
			if (!deck || !deck.url) {
				return;
			}
			var count;
			if (countCache[deck.url]) {
				count = countCache[deck.url];
			} else {
				count = deckCardCount(deck);
				countCache[deck.url] = count;
			}
			if (count === 30) {
				toRet.push(deck);
			}
		});
		return toRet;
	};
});