'use strict';
 
app.controller('TasksCtrl', function ($scope, $rootScope, $timeout, $location, Task, Auth, User) {
  
  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    console.log('Login event noticed by TasksCtrl.');
    $rootScope.currentUser = user;
    $scope.user = User.getCurrentUser($rootScope.currentUser.id);
    $scope.populateTasks();
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

  $scope.task = {
    title: '',
    date: '',
    description: '',
    lists: [],
    user: ''
  };


  $scope.populateTasks = function() {
    $scope.userTasks = User.getUserTasks($rootScope.currentUser.id);
    var index = $scope.userTasks.$getIndex();

    angular.forEach($scope.userTasks, function(taskId, index) {
      console.log('index: ', index);
      console.log('taskId', taskId);
      $scope.tasks[index] = Task.find(taskId);
    })
  };

  $scope.createTask = function() {
    if ($rootScope.signedIn) {
      $scope.task.date = Date.now();
      $scope.task.user = $rootScope.currentUser.email;
      var userRef = $rootScope.currentUser.id;
      Task.create($scope.task).then(function(ref) {
        $scope.taskId = ref.name();
        User.addTaskToUser(userRef, $scope.taskId);
        
        $scope.task = {                 //resets the task to empty values
          title: '',
          date: '',
          description: '',
          lists: [],
          user: ''
        };
      });
    } else {
      console.log('There is no user signed in right now.');
    }
  };


  $scope.updateTask = function(taskId) {
    if ($rootScope.signedIn) {
      Task.update(taskId); 
    } else {
      console.log('There is no user signed in right now.');
    }
  };

  $scope.deleteTask = function (taskId) {
    if ($rootScope.signedIn) {
      var userRef = $rootScope.currentUser.id;
      Task.delete(taskId);
      User.deleteTaskFromUser(userRef, taskId);
    } else {
      console.log('There is no user signed in right now.');
    }
  };

});