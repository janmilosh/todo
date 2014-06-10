'use strict';

app.controller('NavCtrl', function($rootScope, $scope, $location, Auth, User) {

  $scope.logout = function() {    
    Auth.logout();         
  };

  $rootScope.$on("$firebaseSimpleLogin:logout", function(evt) {
    $location.path('/login');
  });
});