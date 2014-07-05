'use strict';

app.controller('NavCtrl', function($scope, $rootScope, $location, Auth) {

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $rootScope.currentUser = user;
    $rootScope.signedIn = true;
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    $rootScope.signedIn = false;
    $rootScope.currentUser = null;
    $location.path('/login/');
  });

  $scope.logout = function() {
    Auth.logout();
    $rootScope.currentUser = null;
    $location.path('/login/');
  };

});