'use strict';
 
app.controller('AuthCtrl', function($scope, $rootScope, $location, Auth, User) {

  if (Auth.signedIn()) {
    $location.path('/');
  }

  $scope.login = function() {
    $scope.error = null;
    Auth.login($scope.user).then(function() {
      $scope.resetForm();
      $location.path('/');
    }, function(error) {
      $scope.error = error.toString();
    });
  };

  $scope.register = function() {
    $scope.error = null;
    Auth.register($scope.user).then(function(authUser) {
      User.create(authUser, $scope.user.username);
      $scope.login($scope.user);
      $scope.resetForm();
    }, function(error) {
      $scope.error = error.toString();
    });
  };

  $scope.resetForm = function() {
    $scope.user = { email: '', password: '', passwordConfirmation: '' };
  };
});