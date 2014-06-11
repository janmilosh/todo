'use strict';
 
app.factory('Auth', function($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);

  var auth = $firebaseSimpleLogin(ref);

  var Auth = {
    passwordMissmatch: false,
    register: function(user) {        
      if(user.password === user.passwordConfirmation) {
        Auth.passwordMissmatch = false;
        return auth.$createUser(user.email, user.password);
      } else {
        Auth.passwordMissmatch = true;
      }        
    },
    login: function (user) {
      return auth.$login('password', { email: user.email, password: user.password, rememberMe: true });
    },
    logout: function() {
      auth.$logout();
    },
    getCurrentUser: function() {
      auth.$getCurrentUser().then(function(authUser) {
        console.log('Current user in the factory functin', authUser);
        return authUser;
      })
    }
  };

  $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
    console.log("User " + user.email + " successfully logged in!");
    $rootScope.signedIn = true;
  });

  $rootScope.$on("$firebaseSimpleLogin:logout", function() {
    console.log("Logout event fired.");
    $rootScope.signedIn = false;
  });

  return Auth;
});