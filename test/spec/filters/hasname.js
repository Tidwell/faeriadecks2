'use strict';

describe('Filter: hasName', function () {

  // load the filter's module
  beforeEach(module('faeriadecks2App'));

  // initialize a new instance of the filter before each test
  var hasName;
  beforeEach(inject(function ($filter) {
    hasName = $filter('hasName');
  }));

  it('should return the input prefixed with "hasName filter:"', function () {
    var text = 'angularjs';
    expect(hasName(text)).toBe('hasName filter: ' + text);
  });

});
