'use strict';

describe('Service: DiscusComments', function () {

  // load the service's module
  beforeEach(module('faeriadecks2App'));

  // instantiate service
  var DiscusComments;
  beforeEach(inject(function (_DiscusComments_) {
    DiscusComments = _DiscusComments_;
  }));

  it('should do something', function () {
    expect(!!DiscusComments).toBe(true);
  });

});
