'use strict';
 
app.controller('AuthCtrl', function($scope, $rootScope, $location, Auth) {
  
  $rootScope.$on("$firebaseSimpleLogin:login", function(e, currentUser) {
    $scope.currentUser = currentUser;
    console.log('currentUser in the controller: ', $scope.currentUser);
  });
 
  $rootScope.$on('$locationChangeSuccess', function() {
    $scope.currentUser = Auth.getCurrentUser();
    console.log('currentUser after route change: ', $scope.currentUser);
  });

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
    $scope.passwordMissmatch = Auth.passwordMissmatch;
    console.log('passwordMissmatch: ',Auth.passwordMissmatch)
    Auth.register($scope.user).then(function(authUser) {
      $scope.passwordMissmatch = false;
      Auth.login($scope.user);
      $scope.currentUser = authUser;
      $scope.resetForm();
     // $location.path('/');
    }, function(error) {
      $scope.error = error.toString();
    });  
  };

  $scope.resetForm = function() {
    $scope.user = { email: '', password: '', passwordConfirmation: '' };
  };
});