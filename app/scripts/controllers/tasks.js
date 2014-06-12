'use strict';
 
app.controller('TasksCtrl', function ($scope, Task, Auth, $timeout) {
  
  $scope.now = Date.now();
  var updateTime = function() {
    $scope.now = Date.now();
    $timeout(updateTime, 60000);
  };
  updateTime();

  Auth.getCurrentUser().then(function(authUser) {
    $scope.currentUser = authUser;
  });

  $scope.tasks = Task.all;

  $scope.task = {
    title: '',
    date: '',
    description: '',
    lists: []
  };

  $scope.createTask = function() {
    $scope.task.date = Date.now();

    Task.create($scope.task).then(function() {
      
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
  }

  $scope.deleteTask = function (taskId) {
    Task.delete(taskId);
  };
});