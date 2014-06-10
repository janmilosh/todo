'use strict';
 
app.factory('Auth', function($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);

  var auth = $firebaseSimpleLogin(ref);

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
      return auth.$login('password', { email: user.email, password: user.password });
    },
    logout: function() {
      auth.$logout();
    },
    getCurrentUser: function() {
      return auth.$getCurrentUser();
    }
  };

  $rootScope.signedIn = false;

  $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
    console.log("User " + user.email + " successfully logged in!");
    $rootScope.signedIn = true;
  });

  $rootScope.$on("$firebaseSimpleLogin:logout", function() {
    console.log("You have successfully logged out!");
    $rootScope.signedIn = false;
  });

  return Auth;
});