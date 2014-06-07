'use strict';
 
app.controller('AuthController', function($scope, $location, Auth) {
  if (Auth.signedIn()) {
    $location.path('/');
  }

  $scope.$on('$firebaseSimpleLogin:login', function() {
    $location.path('/');
  });

  $scope.login = function() {
    Auth.login($scope.user).then(function() {
      $location.path('/');
    }, function(error) {
      $scope.error = error.toString();
    });
  };

  $scope.register = function() {
    try {
      Auth.register($scope.user).then(function(authUser) {
        console.log('Registered User:', authUser);
        $location.path('/login');
      }, function(error) {
        $scope.error = error.toString();
      });
    } catch(e) {
      console.log(e);
    }    
  };
});