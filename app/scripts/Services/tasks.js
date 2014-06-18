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
    update: function(taskId, key, value) {
      tasks.$child(taskId).$child(key).$set(value);
    },
    delete: function(taskId) {
      tasks.$remove(taskId);
    },
    addListToTask: function(taskRef, listId) {
      var task = tasks.$child(taskRef);
      task.$child('lists').$child(listId).$set(true);
    },
    deleteListFromTask: function(taskRef, listId) {
      var task = Task.getCurrentTask(taskRef);
      task.$child('lists').$remove(listId);
    }
  };
 
  return Task;
});