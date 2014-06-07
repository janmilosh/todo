'use strict';

app.controller('NavController', function($scope, $location, Auth) {

  $scope.logout = function() {
    Auth.logout();
  };
});