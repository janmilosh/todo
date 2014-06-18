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
    // },
    // find: function(taskId) {
    //   return tasks.$child(taskId);
    // },
    // update: function(taskId, key, value) {
    //   tasks.$child(taskId).$child(key).$set(value);
    // },
    // delete: function(taskId) {
    //   tasks.$remove(taskId);
    // },
    // addListToTask: function(taskRef, listId) {
    //   var task = tasks.$child(taskRef);
    //   task.$child('lists').$child(listId).$set(true);
    // },
    // deleteListFromTask: function(taskRef, listId) {
    //   var task = Task.getCurrentTask(taskRef);
    //   task.$child('lists').$remove(listId);
    
    }
  };
 
  return Task;
});