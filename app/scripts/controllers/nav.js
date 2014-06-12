'use strict';

app.controller('NavCtrl', function($rootScope, $scope, $location, Auth) {

  $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
    $scope.currentUser = user;
  });

  $scope.logout = function() {    
    Auth.logout();
    $scope.currentUser = null;
    $location.path('/login');         
  };

});