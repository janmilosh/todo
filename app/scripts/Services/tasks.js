'use strict';

app.factory('Task', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL + 'tasks');
  var tasks = $firebase(ref);
 
  var Task = {
    all: tasks,
    create: function (task) {
      return tasks.$add(task);
    },
    find: function (taskId) {
      return tasks.$child(taskId);
    },
    delete: function (taskId) {
      return tasks.$remove(taskId);
    }
  };
 
  return Task;
});