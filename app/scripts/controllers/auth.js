'use strict';
 
app.controller('AuthCtrl', function($scope, $location, Auth, User) {
  
  $scope.currentUser = null;

  $scope.login = function() {
    Auth.login($scope.user).then(function(authUser) {
      $scope.currentUser = authUser;
      console.log('current user: ', authUser);
      $scope.resetForm();
      //$location.path('/');
    }, function(error) {
      $scope.error = error.toString();
    });
  };

  $scope.register = function() {
    Auth.register($scope.user).then(function(authUser) {
      $scope.currentUser = authUser;
      //User.create(authUser, $scope.user.username);
     // $location.path('/');
    }, function(error) {
      $scope.error = error.toString();
    });  
  };

  $scope.resetForm = function() {
    $scope.user = { email: '', password: '' };
  };
});