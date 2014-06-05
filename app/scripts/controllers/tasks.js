'use strict';
 
app.controller('TasksController', function ($scope, Task) {
  $scope.tasks = Task.all;

  $scope.task = {
    title: '',
    date: '',
    description: '',
    tags: []
  };


  $scope.createTask = function() {
    $scope.task.date = Date.now();

    Task.create($scope.task).then(function() {
      
      $scope.task = {                 //resets the task to empty values
        title: '',
        date: '',
        description: '',
        tags: []
      };
    });
  };

  $scope.deleteTask = function (taskId) {
    Task.delete(taskId);
  };
});