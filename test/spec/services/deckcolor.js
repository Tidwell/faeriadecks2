'use strict';

describe('Service: Deckcolor', function () {

  // load the service's module
  beforeEach(module('faeriadecks2App'));

  // instantiate service
  var Deckcolor;
  beforeEach(inject(function (_Deckcolor_) {
    Deckcolor = _Deckcolor_;
  }));

  it('should do something', function () {
    expect(!!Deckcolor).toBe(true);
  });

});
