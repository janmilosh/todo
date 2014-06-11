'use strict';
 
app.controller('AuthCtrl', function($scope, $rootScope, $location, Auth) {

  $scope.login = function() {
    $scope.error = null;
    Auth.login($scope.user).then(function(authUser) {
      $rootScope.currentUser = authUser;
      console.log('current user: ', $rootScope.currentUser);
      $scope.resetForm();
      $location.path('/');
    }, function(error) {
      $scope.error = error.toString();
    });
  };

  $scope.register = function() {
    $scope.error = null;
    console.log('passwordMissmatch: ',$rootScope.passwordMissmatch)
    Auth.register($scope.user).then(function(authUser) {
      Auth.login($scope.user);
      $rootScope.currentUser = authUser;
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