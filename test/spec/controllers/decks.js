'use strict';

describe('Controller: DecksCtrl', function () {

  // load the controller's module
  beforeEach(module('faeriadecks2App'));

  var DecksCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DecksCtrl = $controller('DecksCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
