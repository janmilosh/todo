'use strict';

app.controller('NavCtrl', function($scope, $rootScope, $location, Auth) {

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    console.log('Login event noticed by NavCtrl.');
    $rootScope.signedIn = true;
    $rootScope.currentUser = user;
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    console.log('Logout event noticed by NavCtrl.');
    $rootScope.signedIn = false;
    $rootScope.currentUser = null;
    $location.path('/login');
  });

  $scope.logout = function() {
    Auth.logout();
    $scope.currentUser = null;
    $location.path('/login');
  };

});