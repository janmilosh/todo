'use strict';
 
app.controller('ListsCtrl', function ($scope, $rootScope, $timeout, $location, List, Task) {
  
  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $rootScope.currentUser = user;
    $scope.user = $rootScope.currentUser.id;
    $rootScope.signedIn = true;
    $scope.populateLists();
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
    $priority: 3
  };

  $scope.$on('$routeChangeSuccess', function() {
    if ($rootScope.signedIn) {
      $scope.user = $rootScope.currentUser.id;
      $scope.populateLists();
    } else {
      console.log('Waiting for firebase login event to occur.');
    }
  });

  $scope.createList = function() {
    if ($rootScope.signedIn) {
      $scope.list.date = Date.now();
      List.addListToUser($scope.list, $scope.user).then(function() {
        $scope.populateLists();
        $scope.list = {                 //resets the list to empty values
          title: '',
          date: '',
          $priority: 3
        };
      });
    }
  };

  $scope.populateLists = function() {
    if ($rootScope.signedIn) {
      $scope.lists = List.getUserLists($rootScope.currentUser.id);
    }
  };
  
  $scope.updateListItem = function(listId, key, value) {
    if ($rootScope.signedIn) {
      List.updateListItem(listId, key, value, $scope.user);
    }
  };

  // $scope.deleteList = function (listId, listPriority) {
  //   if ($rootScope.signedIn && listPriority >=3) {

  //     List.deleteListFromUser(listId, $scope.user);
  //     $scope.tasks = Task.getUserTasks($rootScope.currentUser.id);

  //     angular.forEach($scope.tasks, function(taskValue, taskKey) {
  //       angular.forEach(taskValue.lists, function(taskListValue, taskListKey) {
  //         if (taskListKey === listId) {
  //           Task.deleteListFromTask(taskKey, listId, $scope.user);
  //         }
  //       });
  //     });
  //   }
  // };

  // $scope.hideListDeleteButton = function(listPriority) {
  //   return (listPriority <= 2);
  // };

  $scope.viewListDetail = function(listId) {
    if ($rootScope.signedIn) {
      $location.path('/list/' + listId);
    }
  };

});