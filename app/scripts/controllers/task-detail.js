'use strict';

app.controller('TaskDetailCtrl', function ($scope, $rootScope, $routeParams, $location, User, Task, List) {
    
  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $rootScope.currentUser = user;
    $scope.user = $rootScope.currentUser.id;
    $rootScope.signedIn = true;
    $scope.populateTaskDetails();
    $scope.populateLists();
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    $rootScope.signedIn = false;
    delete $rootScope.currentUser;
    $location.path('/login');
  });

  $scope.$on('$routeChangeSuccess', function() {
    $scope.populateTaskDetails();
    $scope.populateLists();
  });
  
  $scope.populateTaskDetails = function() {
    if ($rootScope.signedIn) {
      $scope.user = $rootScope.currentUser.id;
      $scope.task = Task.findTaskById($routeParams.taskId, $scope.user);
    } else {
      console.log('in the detail page, not signed in yet');
    }
  };

  $scope.populateLists = function() {
    if ($rootScope.signedIn) {
      $scope.lists = List.getUserLists($rootScope.currentUser.id);
    }
  };

  $scope.addTaskToList = function(taskId, listId) {
    if ($rootScope.signedIn) {
      List.addTaskToList(taskId, listId, $scope.user);
      Task.addListToTask(taskId, listId, $scope.user);
    }
  };
});
