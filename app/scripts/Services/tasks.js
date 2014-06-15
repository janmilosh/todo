'use strict';

app.factory('Task', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL + 'tasks');
  var tasks = $firebase(ref);

  var Task = {
    create: function(task) {
      return tasks.$add(task);
    },
    find: function(taskId) {
      return tasks.$child(taskId);
    },
    update: function(taskId) {
      return tasks.$save(taskId);
    },
    delete: function(taskId) {
      tasks.$remove(taskId);
    }
  };
 
  return Task;
});