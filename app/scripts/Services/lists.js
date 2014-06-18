'use strict';

app.factory('List', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL + 'lists');
  var lists = $firebase(ref);

  var List = {
    create: function(list) {
      return lists.$add(list);
    },
    find: function(listId) {
      return lists.$child(listId);
    },
    update: function(listId, key, value) {
      lists.$child(listId).$child(key).$set(value);
    },
    delete: function(listId) {
      lists.$remove(listId);
    }
  };
 
  return List;
});