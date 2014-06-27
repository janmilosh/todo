'use strict';

app.controller('TaskDetailCtrl', function ($scope, $rootScope, $routeParams, $location, User, Task, List) {
    
  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $rootScope.currentUser = user;
    $scope.user = $rootScope.currentUser.id;
    $rootScope.signedIn = true;
    $scope.populateTaskDetails();
    $scope.populateLists();
    $scope.highlightLists();
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    $rootScope.signedIn = false;
    delete $rootScope.currentUser;
    $location.path('/login');
  });

  $scope.$on('$routeChangeSuccess', function() {
    $scope.populateTaskDetails();
    $scope.populateLists();
    $scope.highlightLists();
  });

  $scope.populateTaskDetails = function() {
    if ($rootScope.signedIn) {
      $scope.user = $rootScope.currentUser.id;
      $scope.task = Task.findTaskById($routeParams.taskId, $scope.user);
    } else {
      console.log('in the detail page, not signed in yet');
    }
  };

  $scope.populateLists = function() {
    if ($rootScope.signedIn) {
      $scope.lists = List.getUserLists($rootScope.currentUser.id);
      console.log('$scope.lists', $scope.lists);
    }
  };

  $scope.addOrRemoveTaskFromList = function(taskId, listId) { //This needs to be fixed, use highlight menthod parts todetermine if true or false
    var taskQuery = $scope.taskIsOnList(taskId, listId);
    console.log('taskQuery', taskQuery);
    if (!taskQuery) {                                      //true if the task is on the list, so remove
      console.log('removing task in add or remove');
      $scope.removeTaskFromList(taskId, listId);
    } else {
      console.log('adding task in add or remove');
      $scope.addTaskToList(taskId, listId);
    }
  }

  $scope.taskIsOnList = function(taskId, listId) {
    console.log('listId', listId);
    console.log('taskId', taskId);
    if ($rootScope.signedIn) {
      angular.forEach($scope.task.lists, function(taskValue, taskListId) {
        console.log(listId===taskListId);
        if (listId === taskListId) {
          console.log('should be returning now');
          return true;
        }
      });
    }
  };

  $scope.addTaskToList = function(taskId, listId) {
    if ($rootScope.signedIn) {
      List.addTaskToList(taskId, listId, $scope.user);
      Task.addListToTask(taskId, listId, $scope.user);
      console.log('adding task in add task');
      $scope.listsToHighlight[listId] = true;
    }
  };

  $scope.removeTaskFromList = function(taskId, listId) {
    if ($rootScope.signedIn) {
      List.deleteTaskFromList(taskId, listId, $scope.user);
      Task.deleteListFromTask(taskId, listId, $scope.user);
      console.log('removing task in remove task');
      $scope.listsToHighlight[listId] = false;
    }
  };
  
  $scope.highlightLists = function() {   //This might be able to be refactored and part taken out as a separate function
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
  };
});
