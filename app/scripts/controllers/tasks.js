'use strict';
 
app.controller('TasksCtrl', function ($scope, $rootScope, $timeout, $location, Task, Auth, User) {
  
  $scope.focusOnTitle = true;

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
    description: '',
    lists: []
  };

  $scope.$on('$routeChangeSuccess', function() {
    if ($rootScope.signedIn) {
      $scope.populateTasks();
    } else {
      console.log('Waiting for firebase login event to occur.');
    }
  });

  $scope.createTask = function() {
    if ($rootScope.signedIn) {
      $scope.task.date = Date.now();
      console.log('$scope.task: ', $scope.task);
      console.log('$scope.user: ', $scope.user);
      User.addTaskToUser($scope.task, $scope.user).then(function() {
        $scope.populateTasks();
        $scope.task = {                 //resets the task to empty values
          title: '',
          date: '',
          description: '',
          lists: []
        };
      });
    } else {
      console.log('There is no user signed in right now.');
    }
  };

  $scope.populateTasks = function() {
    if ($rootScope.signedIn) {
      $scope.tasks = User.getUserTasks($rootScope.currentUser.id);
    }
  }
  
  $scope.updateTask = function(taskId, key, value) {
    if ($rootScope.signedIn) {
      Task.update(taskId, key, value);
    } else {
      console.log('There is no user signed in right now.');
    }
  };

  $scope.deleteTask = function (taskId) {
    if ($rootScope.signedIn) {
      var userRef = $rootScope.currentUser.id;
      User.deleteTaskFromUser(taskId, userRef);
    } else {
      console.log('There is no user signed in right now.');
    }
  };

});