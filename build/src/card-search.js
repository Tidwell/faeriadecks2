var cardList = require('faeria-cards');
var fuzzy = require('fuzzy');

var imgUrlPrefix = 'http://faeriadecks.com/images/card-renders/';

//map the cards by name for quick lookup
var cardNameMap = {};
cardList.forEach(function(card) {
	cardNameMap[card.name.toLowerCase()] = card;
});

//card images are padded with 0s up to 3 digits, so id 1 becomes 001
function padNum(num) {
	while (String(num).length < 3) {
		num = '0' + num;
	}
	return num;
}

module.exports = function(req, res) {
  if (!req.params.card) {
    return res.status(400).json({
      error: 'You need to specify a card name'
    });
  }
	//get the card name from the message
	var cardName = req.params.card.toLowerCase().trim();
	
	//check there is one
	if (!cardName) {
		return res.status(400).json({
      error: 'You need to specify a card name'
    });
	}
	//if its a perfect match, send it back
	if (cardNameMap[cardName]) {
		return res.json({
      image: imgUrlPrefix + padNum(cardNameMap[cardName].id) + '.png'
    });
	}
	//otherwise use fuzzy search to find a match
	var card = fuzzy.filter(cardName, cardList, {
		extract: function(el) {
			return el.name;
		}
	});
	//if we got a match, reply
	if (card.length) {
		return res.json({
      image: imgUrlPrefix + padNum(card[0].original.id) + '.png'
    })
  }

	//otherwise tell the user we cant find it
	return res.status(404).json({
    error: 'No card found'
  });
};
