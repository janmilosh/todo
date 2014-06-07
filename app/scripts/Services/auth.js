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
    signedIn: function() {
      return auth.user !== null;
    },
    login: function (user) {
      return auth.$login('password', user);
    },
    logout: function () {
      auth.$logout();
    },
    findByUsername: function (username) {
      if (username) {
        return users.$child(username);
      }
    }
  };

  $rootScope.signedIn = function () {
    return Auth.signedIn();
  };

  return Auth;
});