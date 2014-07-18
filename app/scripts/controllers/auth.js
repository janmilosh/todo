'use strict';
 
app.controller('AuthCtrl', function($scope, $rootScope, $location, Auth, User) {

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $rootScope.currentUser = user;
    $scope.user = $rootScope.currentUser.id;
    $rootScope.signedIn = true;
    $location.path('/');
  });

  $scope.$on('$routeChangeSuccess', function() {
    if ($rootScope.signedIn) {
      $location.path('/');
    }
  });

  $scope.sendResetPasswordEmail = function() {
    $scope.resetError = null;
    Auth.resetPassword($scope.resetEmail).then(function() {
      $scope.reset = false;
      $scope.resetMessage = 'Please check your email for your new temporary password.';
    }, function(error) {
      $scope.resetError = error.toString();
      $scope.resetMessage = null;
    });
  };

  $scope.showResetInput = function() {
    $scope.reset = true;
  }

  $scope.login = function() {
    $scope.resetMessage = null;
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

});