'use strict';

app.factory('Task', function ($firebase, FIREBASE_URL, $rootScope, User) {
  var ref = new Firebase(FIREBASE_URL + 'tasks');
  var tasks = $firebase(ref);

  var Task = {
    all: function() {
      if (User.signedIn()) {
        var user = User.getCurrent();

        console.log('user: ', user);
        
        return tasks + '/' + user.username;
      }
    },
    create: function(task) {
      if (User.signedIn) {
        var user = User.getCurrent();

        task.owner = user.username;


        return tasks.$add(task).then(function(ref) {
          var taskId = ref.name();
          
          user.$child('tasks').$child(taskId).$set(taskId);
          
          return taskId;
        });
      }
    },
    find: function(taskId) {
      return tasks.$child(taskId);
    },
    update: function(taskId) {
      return tasks.$save(taskId);
    },
    delete: function(taskId) {
      if (User.signedIn) {
        tasks.$remove(taskId).then(function() {
          var user = User.getCurrent();
          user.$child('tasks').$remove(taskId);
        });
      }
    }
  };
 
  return Task;
});