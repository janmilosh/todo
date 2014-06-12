'use strict';
 
app.controller('AuthCtrl', function($scope, $rootScope, $location, Auth) {

  Auth.getCurrentUser().then(function(authUser) {
    $scope.currentUser = authUser;
  });

  $scope.login = function() {
    $scope.error = null;
    Auth.login($scope.user).then(function(authUser) {
      $scope.currentUser = authUser;
      $scope.resetForm();
      $location.path('/');
    }, function(error) {
      $scope.error = error.toString();
    });
  };

  $scope.register = function() {
    $scope.error = null;
    Auth.register($scope.user).then(function(authUser) {
      Auth.login($scope.user);
      $scope.currentUser = authUser;
      $scope.resetForm();
      $location.path('/');
    }, function(error) {
      $scope.error = error.toString();
    });
  };

  $scope.resetForm = function() {
    $scope.user = { email: '', password: '', passwordConfirmation: '' };
  };
});