'use strict';
 
app.controller('ListsCtrl', function ($scope, $rootScope, $timeout, $location, Task, Auth, User, List) {

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $rootScope.currentUser = user;
    $scope.user = User.getCurrentUser($rootScope.currentUser.id);
    $rootScope.signedIn = true;
    // $scope.populateTasks();
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

  $scope.list = {
    title: '',
    date: '',
    user: ''
  };

  $scope.$on('$routeChangeSuccess', function() {
    if ($rootScope.signedIn) {
      //$scope.populateTasks();
    } else {
      console.log('Waiting for firebase login event to occur.');
    }
  });

  // $scope.populateTasks = function() {
  //   $scope.userTasks = User.getUserTasks($rootScope.currentUser.id);
  //   $scope.userTasks.$on('loaded', function() {

  //     $scope.tasks = {};
  //     var counter = 0;
      
  //     angular.forEach($scope.userTasks, function(value, taskId) {
  //       if (value === true) {
  //         $scope.tasks[counter] = Task.find(taskId);
  //         counter += 1;
  //       }
  //     });
  //   });
  // };

  $scope.createList = function() {
    if ($rootScope.signedIn) {
      $scope.list.date = Date.now();
      $scope.list.user = $rootScope.currentUser.email;

      var taskRef = $scope.selectedTask.id;
      List.create($scope.list).then(function(ref) {
        $scope.listId = ref.name();
        Task.addListToTask(taskRef, $scope.listId);
        
        $scope.list = {                 //resets the task to empty values
          title: '',
          date: '',
          user: ''
        };

        // $scope.populateTasks();
      });
    } else {
      console.log('There is no user signed in right now.');
    }
  };
  
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
      Task.delete(taskId);
      User.deleteTaskFromUser(userRef, taskId);
      $scope.populateTasks();
    } else {
      console.log('There is no user signed in right now.');
    }
  };

});