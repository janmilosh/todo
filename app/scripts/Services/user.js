'use strict';

app.factory('User', function($firebase, FIREBASE_URI) {
  var ref = new Firebase(FIREBASE_URI + 'users');
  var users = $firebase(ref);
  
  User = {
    
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
  }

  return User

});
