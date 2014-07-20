'use strict';

app.controller('ListDetailCtrl', function ($scope, $rootScope, $routeParams, $location, User, Task, List) {
    
  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $rootScope.currentUser = user;
    $scope.user = user;
    $rootScope.signedIn = true;
    $scope.populateListDetails();
    $scope.populateTasks();
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    $rootScope.signedIn = false;
    delete $rootScope.currentUser;
    $location.path('/');
  });

  $scope.$on('$routeChangeSuccess', function() {
    $scope.populateListDetails();
    $scope.populateTasks();
  });

  $scope.populateListDetails = function() {
    if ($rootScope.signedIn) {
      $scope.user = $rootScope.currentUser;
      $scope.list = List.findListById($routeParams.listId, $scope.user.id);
      if ($scope.list) { //if there are lists
        $scope.list.$on('loaded', function() {
          $scope.hasTasks = !!$scope.list.tasks;
        });
      }
    } else {
      console.log('in the detail page, not signed in yet');
    }
  };

  $scope.updateListItem = function(listId, key, value) {//is this in the service yet?????
    if ($rootScope.signedIn) {
      List.updateListItem(listId, key, value, $scope.user.id);
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

      List.deleteListFromUser(listId, $scope.user.id);
      $scope.tasks = Task.getUserTasks($scope.user.id);
      
      angular.forEach($scope.tasks, function(taskValue, taskKey) { //loop through the tasks
        var count = 0; //initialize to zero lists to start
        var onList = false; //initialize to task not on list
        
        angular.forEach(taskValue.lists, function(taskListValue, taskListKey) { //loop through task lists
          if (taskListKey === listId) { //take this list off the task if it's there
            Task.deleteListFromTask(taskKey, listId, $scope.user.id);
            onList = true; //task is on the deleted list
          }

          count += 1; //counts the number of lists the task is on
        });

        if (count === 1 && onList) { //if the task was on only one list and on the deleted list
          //add task to inbox and add inbox to task
          List.addTaskToList(taskKey, 'inbox', $scope.user.id);
          Task.addListToTask(taskKey, 'inbox', $scope.user.id);
        }
      });
      $location.path('/lists/');
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
      $scope.tasks = Task.getUserTasks($scope.user.id);
    }
  };

  $scope.viewTaskDetail = function(taskId) {
    if ($rootScope.signedIn) {
      $location.path('/task/' + taskId);
    }
  };

});
