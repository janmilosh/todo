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
    addTaskToUser: function(userRef, taskId) {
      var user = users.$child(userRef);
      user.$child('tasks').$child(taskId).$set(true);
    },
    deleteTaskFromUser: function(userRef, taskId) {
      var user = users.$child(userRef);
      user.$child('tasks').$remove(taskId);
    },
    getUserTasks: function(userRef) {
      var user = users.$child(userRef);
      return user.$child('tasks');
    },
    getCurrentUser: function(userRef) {
      return users.$child(userRef);
    }
  };

  return User;
});
