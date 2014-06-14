'use strict';
 
app.controller('TasksCtrl', function ($scope, $rootScope, Task, Auth, User,$timeout) {
  
  $scope.now = Date.now();
  var updateTime = function() {
    $scope.now = Date.now();
    $timeout(updateTime, 60000);
  };
  updateTime();

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $rootScope.currentUser = user;
  });

  // Auth.getCurrentUser().then(function(authUser) {
  //   $scope.currentUser = authUser;
  //   console.log('authUser: ', authUser);
  // });

  $scope.tasks = Task.all;

  $scope.task = {
    title: '',
    date: '',
    description: '',
    lists: []
  };

  $scope.createTask = function() {
    $scope.task.date = Date.now();

    Task.create($scope.task).then(function(ref) {
      var taskId = ref.name();
      User.addTaskToUser($rootScope.currentUser, taskId);
      
      $scope.task = {                 //resets the task to empty values
        title: '',
        date: '',
        description: '',
        lists: []
      };
    });         
  };

  $scope.updateTask = function(taskId) {
    Task.update(taskId);
  };

  $scope.deleteTask = function (taskId) {
    Task.delete(taskId);
  };
});