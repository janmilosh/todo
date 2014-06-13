'use strict';

app.factory('User', function($firebase, FIREBASE_URL, Auth, $rootScope) {
  var ref = new Firebase(FIREBASE_URL + 'users');
  var users = $firebase(ref);

  var User = {
    all: users,
    create: function(newAuthUser) { 
      users.$add({
        id: newAuthUser.id,
        email: newAuthUser.email,
        md5_hash: newAuthUser.md5_hash
      });
    },
    getCurrentUserRef: function() {
      return users.$child('40');
    }
  };

  return User;

});
