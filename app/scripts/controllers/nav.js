'use strict';

app.controller('NavCtrl', function($rootScope, $scope, $location, Auth) {

  $scope.logout = function() {    
    Auth.logout();         
  };

  $rootScope.$on("$firebaseSimpleLogin:logout", function(evt) {
    $location.path('/login');
  });
});