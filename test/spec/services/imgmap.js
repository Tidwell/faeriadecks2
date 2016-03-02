'use strict';

describe('Service: Imgmap', function () {

  // load the service's module
  beforeEach(module('faeriadecks2App'));

  // instantiate service
  var Imgmap;
  beforeEach(inject(function (_Imgmap_) {
    Imgmap = _Imgmap_;
  }));

  it('should do something', function () {
    expect(!!Imgmap).toBe(true);
  });

});
