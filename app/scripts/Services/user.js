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
    addTaskToUser: function(currentUser, taskId) {
      var currentUserId = currentUser.id;
      console.log('currentUserId: ', currentUserId);
      var user = users.$child(currentUserId);
      console.log('user: ', user);
      user.$child('tasks').$child('taskId').$set(taskId);
    }
  };

  return User;
});
