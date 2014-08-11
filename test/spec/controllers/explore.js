'use strict';

describe('Controller: ExplorectrlCtrl', function () {

  // load the controller's module
  beforeEach(module('firebaseDemoApp'));

  var ExplorectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExplorectrlCtrl = $controller('ExplorectrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
