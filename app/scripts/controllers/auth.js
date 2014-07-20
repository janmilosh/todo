'use strict';
 
app.controller('AuthCtrl', function($scope, $rootScope, $location, Auth, User) {

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $rootScope.currentUser = user;
    $scope.user = $rootScope.currentUser;
    $rootScope.signedIn = true;
  });

  $scope.$on('$routeChangeSuccess', function() {
    if ($rootScope.signedIn) {
      $scope.user = $rootScope.currentUser;
    } else {
      console.log('Waiting for firebase login event to occur.');
    }
  });

  $scope.sendResetPasswordEmail = function() {
    $scope.resetPasswordError = null;
    $scope.message = null;
    Auth.resetPassword($scope.resetEmail).then(function() {
      $scope.reset = false;
      $scope.message = 'Please check your email for your new temporary password.';
    }, function(error) {
      $scope.resetPasswordError = error.toString();
      $scope.message = null;
    });
  };

  $scope.newPassword = function() {
    $scope.error = null;
    $scope.message = null;
    Auth.changePassword($scope.user).then(function() {
      $scope.message = 'Your password has been changed.';
      $scope.resetForm();
    }, function(error) {
      console.log('newPassword controller error', error);
      $scope.error = error.toString();
    });
  };

  $scope.showResetInput = function() {
    $scope.reset = true;
  };

  $scope.login = function() {
    $scope.message = null;
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
    
    Auth.register($scope.user).then(function() { //although registration logs the user in
      
      Auth.login($scope.user).then(function(authUser) { //by logging in again, user will stay logged in
        User.create(authUser); //this sets up the user with initial lists (that are permanent)
        $scope.resetForm();
        $location.path('/');
      }, function(error) {
        $scope.error = error.toString();
      });
    }, function(error) {
      $scope.error = error.toString();
    });
  };

  $scope.resetForm = function() {
    $scope.user = { email: '', password: '', passwordConfirmation: '', oldPassword: '' };
  };

});