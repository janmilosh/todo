'use strict';
 
app.controller('AuthCtrl', function($scope, $rootScope, $location, Auth, User) {


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
      User.create(authUser);
      $scope.login($scope.user);  //although registration logs the user in
      $scope.resetForm();         //by logging in again, user will stay logged in
    }, function(error) {
      $scope.error = error.toString();
    });
  };

  $scope.resetForm = function() {
    $scope.user = { email: '', password: '', passwordConfirmation: '' };
  };

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    console.log('Login event noticed by AuthCtrl.');
    $rootScope.currentUser = user;
    $rootScope.signedIn = true;
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    console.log('Logout event noticed by AuthCtrl.');
    $rootScope.signedIn = false;
    delete $rootScope.currentUser;
    $location.path('/login');
  });
});