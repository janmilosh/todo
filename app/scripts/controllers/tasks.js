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
    lists: [],
    user: ''
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
    Task.update(taskId);
  };

  $scope.deleteTask = function () {
    if ($rootScope.signedIn) {
      //need to get the taskId somehow
      //Put taskId on task object for testing
      //Might be better way to get to task object
      //Check egghead.io tutorial on this
      var userRef = $rootScope.currentUser.id;
      Task.delete(taskId);
      User.removeTaskFromUser(userRef, taskId);
    } else {
      console.log('There is no user signed in right now.');
    }
    
  };
});