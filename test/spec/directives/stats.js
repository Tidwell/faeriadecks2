'use strict';

describe('Directive: stats', function () {

  // load the directive's module
  beforeEach(module('faeriadecks2App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stats></stats>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stats directive');
  }));
});
