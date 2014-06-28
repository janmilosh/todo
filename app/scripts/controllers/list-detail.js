'use strict';

app.controller('ListDetailCtrl', function ($scope, $rootScope, $routeParams, $location, User, Task, List) {
    
  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $rootScope.currentUser = user;
    $scope.user = $rootScope.currentUser.id;
    $rootScope.signedIn = true;
    $scope.populateListDetails();
    $scope.populateTasks();
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    $rootScope.signedIn = false;
    delete $rootScope.currentUser;
    $location.path('/login');
  });

  $scope.$on('$routeChangeSuccess', function() {
    $scope.populateListDetails();
    $scope.populateTasks();
  });

  $scope.populateListDetails = function() {
    if ($rootScope.signedIn) {
      $scope.user = $rootScope.currentUser.id;
      $scope.list = List.findListById($routeParams.listId, $scope.user);
    } else {
      console.log('in the detail page, not signed in yet');
    }
  };

  $scope.updateListItem = function(listId, key, value) {//is this in the service yet?????
    if ($rootScope.signedIn) {
      Task.updateListItem(listId, key, value, $scope.user);
    } else {
      console.log('There is no user signed in right now.');
    }
  };

  $scope.customList = function() {
    var listName = $routeParams.listId;
    return (listName === 'inbox' || listName === 'today' || listName === 'soon');
  };

  $scope.deleteList = function (listId) {
    if ($rootScope.signedIn) {

      List.deleteListFromUser(listId, $scope.user);
      $scope.tasks = Task.getUserTasks($rootScope.currentUser.id);

      angular.forEach($scope.tasks, function(taskValue, taskKey) {
        angular.forEach(taskValue.lists, function(taskListValue, taskListKey) {
          if (taskListKey === listId) {
            Task.deleteListFromTask(taskKey, listId, $scope.user);
          }
        });
      });
      $location.path('/lists');
    }
  };

  $scope.taskIsOnList = function(taskId) {
    var onList = false;
    angular.forEach($scope.list.tasks, function(listValue, listTaskId) {
      if (taskId === listTaskId) {
        onList =  true;
      }
    });
    return onList;
  };

  $scope.populateTasks = function() {
    if ($rootScope.signedIn) {
      $scope.tasks = Task.getUserTasks($rootScope.currentUser.id);
    }
  };

  $scope.viewTaskDetail = function(taskId) {
    if ($rootScope.signedIn) {
      $location.path('/task/' + taskId);
    }
  };

});
