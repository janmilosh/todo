'use strict';
 
app.factory('Auth', function($firebaseSimpleLogin, FIREBASE_URL, $rootScope, $location) {
  var ref = new Firebase(FIREBASE_URL);

  var auth = $firebaseSimpleLogin(ref);

  $rootScope.passwordMissmatch = false;

  var Auth = {
    register: function(user) {
      if(user.password === user.passwordConfirmation) {
        $rootScope.passwordMissmatch = false;
        return auth.$createUser(user.email, user.password);
      } else {
        $rootScope.passwordMissmatch = true;
      }
    },
    login: function (user) {
      return auth.$login('password', { email: user.email, password: user.password, rememberMe: true });
    },
    logout: function() {
      auth.$logout();
      $rootScope.signedIn = false;
      delete $rootScope.currentUser;
      $location.path('/login');
    }
  };

  return Auth;
});