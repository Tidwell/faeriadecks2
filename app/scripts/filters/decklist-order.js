angular.module('faeriadecks2App').filter('decklistOrder', function(Cards) {
	function countLands(card) {
		return card.deserts + card.mountains + card.islands + card.forests;
	}

	return function(deck) {
		if (!deck) { return deck; }
		deck.sort(function(cardA, cardB){

			var fullCardA = Cards.getById(cardA.id);
			var fullCardB = Cards.getById(cardB.id);

			//cost
			if (fullCardA.faeriaCost > fullCardB.faeriaCost) {
				return 1;
			}
			//#lands
			if (fullCardA.faeriaCost === fullCardB.faeriaCost && countLands(fullCardA) > countLands(fullCardB)) {
				return 1;
			}
			//abc
			if (fullCardA.faeriaCost === fullCardB.faeriaCost && countLands(fullCardA) === countLands(fullCardB) && fullCardA.name > fullCardB.name) {
				return 1;
			}
			return -1;
		});
		return deck;
	};
});