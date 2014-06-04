'use strict';
 
app.controller('TasksController', function ($scope) {
  $scope.tasks = [];
  $scope.task = {
    name: '',
    date: '',
    description: '',
    tags: []
  };

  $scope.createTask = function() {
    console.log('clicked button');
    $scope.tasks.push($scope.task);
    $scope.task = {                 //resets the task to empty values
      name: '',
      date: '',
      description: '',
      tags: []
    };
  };
});