'use strict';

describe('Controller: TaskDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('todoApp'));

  var TaskDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaskDetailCtrl = $controller('TaskDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
