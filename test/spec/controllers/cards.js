'use strict';

describe('Controller: CardsCtrl', function () {

  // load the controller's module
  beforeEach(module('faeriadecks2App'));

  var CardsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CardsCtrl = $controller('CardsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
