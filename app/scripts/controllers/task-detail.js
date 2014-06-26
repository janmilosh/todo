'use strict';

app.controller('TaskDetailCtrl', function ($scope, $rootScope, $routeParams, $location, User, Task, List) {
    
  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $rootScope.currentUser = user;
    $scope.user = $rootScope.currentUser.id;
    $rootScope.signedIn = true;
    $scope.populateTaskDetails();
    $scope.populateLists();
    $scope.isTaskOnList();
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    $rootScope.signedIn = false;
    delete $rootScope.currentUser;
    $location.path('/login');
  });

  $scope.$on('$routeChangeSuccess', function() {
    $scope.populateTaskDetails();
    $scope.populateLists();
    $scope.isTaskOnList();
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
    }
  };

  $scope.addOrRemoveTaskFromList = function(taskId, listId) {
    if ($scope.isTaskOnList) {
      console.log('removing task in add or remove');
      $scope.removeTaskFromList(taskId, listId);
    } else {
      console.log('adding task in add or remove');
      $scope.addTaskToList(taskId, listId);
    }
  }

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
  
  $scope.isTaskOnList = function() {
    $scope.listsToHighlight = {};
    angular.forEach($scope.task, function(taskValue, taskListId) {
      if (taskValue === true) {
        angular.forEach($scope.lists, function(listValue, key) {
          if (key === taskListId) {
            $scope.listsToHighlight[key] = true;
            return true;
          }
        });
      }
    });
    return $scope.listsToHighlight;
  };

});
