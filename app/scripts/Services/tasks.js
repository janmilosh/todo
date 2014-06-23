'use strict';

app.factory('Task', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL + 'users');
  var users = $firebase(ref);

  var Task = {
    addTaskToUser: function(task, userId) {
      var user = users.$child(userId);
      return user.$child('tasks').$add(task);
    },
    getUserTasks: function(userId) {
      var user = users.$child(userId);
      return user.$child('tasks');
    },
    deleteTaskFromUser: function(taskId, userId) {
      var user = users.$child(userId);
      user.$child('tasks').$remove(taskId);
    },
    updateTaskItem: function(taskId, key, value, userId) {
      var user = users.$child(userId);
      user.$child('tasks').$child(taskId).$child(key).$set(value);
    },
    findTaskById: function(taskId, userId) {
      var user = users.$child(userId);
      if (taskId) {
        return user.$child('tasks').$child(taskId);
      } else {
        return null;
      }
    },
    addListToTask: function(taskId, listId, userId) {
      var user = users.$child(userId);
      user.$child('tasks').$child(taskId).$child(listId).$set(true);
    },
    deleteListFromTask: function(taskId, listId, userId) {
      var user = users.$child(userId);
      user.$child('tasks').$child(taskId).$remove(listId);
    }
  };
  return Task;
});