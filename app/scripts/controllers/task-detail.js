'use strict';

app.controller('TaskDetailCtrl', function ($scope, $rootScope, $routeParams, $location, $timeout, User, Task, List) {
    
  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $rootScope.currentUser = user;
    $scope.user = $rootScope.currentUser.id;
    $rootScope.signedIn = true;
    $scope.populateTaskDetails();
    $scope.populateLists();
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    $rootScope.signedIn = false;
    delete $rootScope.currentUser;
    $location.path('/login/');
  });

  $scope.$on('$routeChangeSuccess', function() {
    $scope.populateTaskDetails();
    $scope.populateLists();
    $scope.highlightLists();
  });

  $scope.edit = false; //for the task-detail edit area show/hide

  $scope.populateTaskDetails = function() {
    if ($rootScope.signedIn) {
      $scope.user = $rootScope.currentUser.id;
      $scope.task = Task.findTaskById($routeParams.taskId, $scope.user);
      $scope.task.$on('loaded', function() {
        $scope.highlightLists();
      });
    } else {
      console.log('in the detail page, not signed in yet');
    }
  };

  $scope.updateTaskItem = function(taskId, key, value) {
    if ($rootScope.signedIn) {
      Task.updateTaskItem(taskId, key, value, $scope.user);
    } else {
      console.log('There is no user signed in right now.');
    }
  };

  $scope.populateLists = function() {
    if ($rootScope.signedIn) {
      $scope.lists = List.getUserLists($rootScope.currentUser.id);
    }
  };

  $scope.addOrRemoveTaskFromList = function(listId) {
    if ($scope.taskIsOnList(listId)) {
      $scope.removeTaskFromList($scope.task.$id, listId);
    } else {
      $scope.addTaskToList($scope.task.$id, listId);
    }
    $scope.toggleTaskToInbox();
  };

  $scope.taskIsOnList = function(listId) {
    var onList = false;
    angular.forEach($scope.task.lists, function(taskValue, taskListId) {
      if (listId === taskListId) {
        onList =  true;
      }
    });
    return onList;
  };

  $scope.addTaskToList = function(taskId, listId) {
    if ($rootScope.signedIn) {
      List.addTaskToList(taskId, listId, $scope.user);
      Task.addListToTask(taskId, listId, $scope.user);
      $scope.listsToHighlight[listId] = true;
    }
  };

  $scope.removeTaskFromList = function(taskId, listId) {
    if ($rootScope.signedIn) {
      List.deleteTaskFromList(taskId, listId, $scope.user);
      Task.deleteListFromTask(taskId, listId, $scope.user);
      $scope.listsToHighlight[listId] = false;
    }
  };

  $scope.toggleTaskToInbox = function() {
    if ($rootScope.signedIn) {
      if ($scope.task.lists) {
        $scope.removeTaskFromList($routeParams.taskId, 'inbox');
      } else {
        $scope.addTaskToList($routeParams.taskId, 'inbox');
      }
    }
  };

  $scope.highlightLists = function() {
    $timeout(function() {
      $scope.listsToHighlight = {};
      if ($rootScope.signedIn) {
        angular.forEach($scope.task.lists, function(taskValue, taskListId) {
          angular.forEach($scope.lists, function(listValue, key) {
            if (key === taskListId) {
              $scope.listsToHighlight[key] = true;
              return true;
            }
          });
        });
      }
    });
  };

  $scope.deleteTask = function(taskId) {
    if ($rootScope.signedIn) {

      Task.deleteTaskFromUser(taskId, $scope.user);
      $scope.lists = List.getUserLists($rootScope.currentUser.id);

      angular.forEach($scope.lists, function(listValue, listKey) {
        angular.forEach(listValue.tasks, function(listTaskValue, listTaskKey) {
          if (listTaskKey === taskId) {
            List.deleteTaskFromList(taskId, listKey, $scope.user);
          }
        });
      });

      $location.path('/lists/');

    } else {
      console.log('There is no user signed in right now.');
    }
  };
});
