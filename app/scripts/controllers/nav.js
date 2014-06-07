'use strict';

app.controller('NavController', function($rootScope, $scope, $location, Auth) {

  $scope.logout = function() {    
    Auth.logout();         
  };

  $rootScope.$on("$firebaseSimpleLogin:logout", function(evt) {
    $location.path('/login');
  });
});