'use strict';
 
app.controller('TasksCtrl', function ($scope, $rootScope, $timeout, $location, Task, Auth, User) {
  
  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    console.log('Login event noticed by TasksCtrl.');
    $rootScope.currentUser = user;
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    console.log('Logout event fired noticed by TasksCtrl.');
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

  $scope.tasks = Task.all;

  $scope.task = {
    title: '',
    date: '',
    description: '',
    lists: []
  };

  $scope.createTask = function() {
    if ($rootScope.signedIn) {
      $scope.task.date = Date.now();
      
      Task.create($scope.task).then(function(ref) {
        // $scope.taskId = ref.name();
        // User.addTaskToUser(userRef, $scope.taskId);
        
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

  $scope.updateTask = function(taskId) {
    Task.update(taskId);
  };

  $scope.deleteTask = function (taskId) {
    if ($rootScope.signedIn) {
  
      Task.delete(taskId);
    } else {
      console.log('There is no user signed in right now.');
    }
    
  };
});