angular.module('faeriadecks2App').filter('decklistOrder', function(Cards) {
	return function(deck) {
		if (!deck) { return deck; }
		deck.sort(function(cardA, cardB){
			var fullCardA = Cards.getById(cardA.id);
			var fullCardB = Cards.getById(cardB.id);
			if (fullCardA.faeriaCost > fullCardB.faeriaCost) {
				return 1;
			}
			if (fullCardA.faeriaCost === fullCardB.faeriaCost && fullCardA.name > fullCardB.name) {
				return 1;
			}
			return -1;
		});
		return deck;
	}
});