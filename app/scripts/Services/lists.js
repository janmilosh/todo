'use strict';

app.factory('List', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL + 'users');
  var users = $firebase(ref);

  var List = {
    addListToUser: function(list, userId) {
      var user = users.$child(userId);
      return user.$child('lists').$add(list);
    },
    getUserLists: function(userId) {
      var user = users.$child(userId);
      return user.$child('lists');
    },
    deleteListFromUser: function(listId, userId) {
      var user = users.$child(userId);
      user.$child('lists').$remove(listId);
    },
    updateListItem: function(listId, key, value, userId) {
      var user = users.$child(userId);
      user.$child('lists').$child(listId).$child(key).$set(value);
    },
    addTaskToList: function(taskId, listId, userId) {
      var user = users.$child(userId);
      user.$child('lists').$child(listId).$child('tasks').$child(taskId).$set(true);
    },
    deleteTaskFromList: function(taskId, listId, userId) {
      var user = users.$child(userId);
      user.$child('lists').$child(listId).$child('tasks').$remove(taskId);
    }
  };
  return List;
});