'use strict';

app.factory('Task', function ($firebase, FIREBASE_URL, $rootScope, User) {
  var ref = new Firebase(FIREBASE_URL + 'tasks');
  var tasks = $firebase(ref);

  var Task = {
    all: tasks,
    create: function(task) {
      if ($rootScope.signedIn) {
        return tasks.$add(task);
      }
    },
    find: function(taskId) {
      return tasks.$child(taskId);
    },
    update: function(taskId) {
      return tasks.$save(taskId);
    },
    delete: function(taskId) {
      if ($rootScope.signedIn) {
        var task = Task.find(taskId);    
        tasks.$remove(taskId).then(function() {
          currentUserRef.$child('tasks').$remove(taskId);
        });
      }
    }
  };
 
  return Task;
});