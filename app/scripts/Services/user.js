'use strict';

app.factory('User', function($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL + 'users');
  var users = $firebase(ref);

  var User = {
    create: function(newAuthUser) {
      users[newAuthUser.id] = {
        email: newAuthUser.email,
        md5_hash: newAuthUser.md5_hash
      };
      users.$save();
    },
    getUserTasks: function(userRef) {
      var user = User.getCurrentUser(userRef);
      return user.$child('tasks');
    },
    getCurrentUser: function(userRef) {
      return users.$child(userRef);
    }
  };

  return User;
});
