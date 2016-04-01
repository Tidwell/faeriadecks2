angular.module('faeriadecks2App').filter('fullDecks', function(Cards) {
	return function(decks) {
		if (!decks || !decks.forEach) {
			return decks;
		}
		var toRet = [];
		decks.forEach(function(deck) {
			if (!deck || !deck.url) {
				return;
			}
			if (deck.cardCount === 30) {
				toRet.push(deck);
			}
		});
		return toRet;
	};
});