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
      return user.$child('tasks').$child(taskId);
    }
    // addListToTask: function(taskRef, listId) {
    //   var task = tasks.$child(taskRef);
    //   task.$child('lists').$child(listId).$set(true);
    // },
    // deleteListFromTask: function(taskRef, listId) {
    //   var task = Task.getCurrentTask(taskRef);
    //   task.$child('lists').$remove(listId);
    // }
  };
 
  return Task;
});