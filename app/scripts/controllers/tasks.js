'use strict';
 
app.controller('TasksCtrl', function ($scope, $rootScope, $timeout, $location, Task, List) {
  
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

  $scope.createTask = function() {
    if ($rootScope.signedIn) {
      $scope.task.date = Date.now();
      
      Task.addTaskToUser($scope.task, $scope.user).then(function(returnObject) {
        $scope.populateTasks();
        $scope.task = {                 //resets the task to empty values
          title: '',
          date: '',
          description: ''
        };
        var taskId = returnObject.path.n[3]; //thought the actual id was to be returned, but instead
        $scope.addTaskToInbox(taskId);        //some kind of crazy object that contains the path
      });
      

    } else {
      console.log('There is no user signed in right now.');
    }
  };

  $scope.addTaskToInbox = function(taskId) {
    if ($rootScope.signedIn) {
      List.addTaskToList(taskId, 'inbox', $scope.user);
      Task.addListToTask(taskId, 'inbox', $scope.user);
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

  $scope.viewTaskDetail = function(taskId) {
    if ($rootScope.signedIn) {
      $location.path('/task/' + taskId);
    }
  };

});