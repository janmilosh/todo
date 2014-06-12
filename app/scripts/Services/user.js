'use strict';

app.factory('User', function($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL + 'users');
  var users = $firebase(ref);
  var id;

  var User = {
    create: function(newAuthUser) {
      users[id] = {
        email: newAuthUser.email,
        id: newAuthUser.uid,
        $priority: newAuthUser.uid
      };
 
      users.$set(true);
    },
    
    getUserTasks: function(currentUser) {
      return users.$child(currentUser + '/tasks/');
    },
    addTaskToUser: function(currentUser, taskId) {
      var child = users.$child(currentUser + '/tasks/' + taskId.name());
      child.$set(true);
    },
    removUserTask: function(currentUser, taskId) {
      users.$remove(currentUser + '/tasks/' + taskId.name());
    }
  };

  return User;

});
