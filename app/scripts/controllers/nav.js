'use strict';

app.controller('NavCtrl', function($scope, $rootScope, $location, Auth) {

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $scope.headerUsername = user.username;
  });

  $scope.logout = function() {
    Auth.logout();
    $location.path('/login');
    delete $scope.headerUsername;
  };

});