'use strict';
 
app.controller('AuthCtrl', function($scope, $location, Auth, User) {
  // if (Auth.signedIn()) {
  //   $location.path('/');
  // }

  // $scope.$on('$firebaseSimpleLogin:login', function() {
  //   $location.path('/');
  // });

  $scope.newUser = { email: '', password: '' };
  $scope.currentUser = null;

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
    try {
      Auth.register($scope.user).then(function(authUser) {
        $scope.currentUser = authUser;
        //User.create(authUser, $scope.user.username);
       // $location.path('/');
      }, function(error) {
        $scope.error = error.toString();
      });
    } catch(e) {
      console.log(e);
    }    
  };

  $scope.resetForm = function() {
    $scope.newUser = { email: '', password: '' };
  };
});