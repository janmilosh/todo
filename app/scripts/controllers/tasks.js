'use strict';
 
app.controller('TasksCtrl', function ($scope, $rootScope, $timeout, $location, Task) {
  
  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $rootScope.currentUser = user;
    $scope.user = $rootScope.currentUser.id;
    $rootScope.signedIn = true;
    $scope.populateTasks();
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    $rootScope.signedIn = false;
    delete $rootScope.currentUser;
    $location.path('/login');
  });

  $scope.now = Date.now();
  var updateTime = function() {
    $scope.now = Date.now();
    $timeout(updateTime, 60000);
  };
  updateTime();

  $scope.task = {
    title: '',
    date: '',
    description: ''
  };

  $scope.$on('$routeChangeSuccess', function() {
    if ($rootScope.signedIn) {
      $scope.user = $rootScope.currentUser.id;
      $scope.populateTasks();
    } else {
      console.log('Waiting for firebase login event to occur.');
    }
  });

  $scope.inputFocused = false;

  $scope.createTask = function() {
    if ($rootScope.signedIn) {
      $scope.task.date = Date.now();
      
      Task.addTaskToUser($scope.task, $scope.user).then(function() {
        $scope.populateTasks();
        $scope.task = {                 //resets the task to empty values
          title: '',
          date: '',
          description: ''
        };
      });

      $scope.inputFocused = true;

    } else {
      console.log('There is no user signed in right now.');
    }
  };

  $scope.populateTasks = function() {
    if ($rootScope.signedIn) {
      $scope.tasks = Task.getUserTasks($rootScope.currentUser.id);
    }
  };
  
  $scope.updateTaskItem = function(taskId, key, value) {
    if ($rootScope.signedIn) {
      Task.updateTaskItem(taskId, key, value, $scope.user);
    } else {
      console.log('There is no user signed in right now.');
    }
  };

  $scope.deleteTask = function (taskId) {
    if ($rootScope.signedIn) {
      var userId = $rootScope.currentUser.id;
      Task.deleteTaskFromUser(taskId, userId);
    } else {
      console.log('There is no user signed in right now.');
    }
  };

});