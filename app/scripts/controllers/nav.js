'use strict';

app.controller('NavController', function($rootScope, $scope, $location, Auth, User) {

  if (User.signedIn()) {  //This may not be needed later,
    User.getCurrent();    //but for now brings in the user to the header,
  }                       //even on page refresh (puts current user on $rootScope again)


  $scope.logout = function() {    
    Auth.logout();         
  };

  $rootScope.$on("$firebaseSimpleLogin:logout", function(evt) {
    $location.path('/login');
  });
});