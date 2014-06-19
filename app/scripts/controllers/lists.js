'use strict';
 
app.controller('ListsCtrl', function ($scope, $rootScope, $timeout, $location, List) {
  
  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $rootScope.currentUser = user;
    $scope.user = $rootScope.currentUser.id;
    console.log('$scope.user in ListsCtrl: ', $scope.user);
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
      console.log('$scope.list: ', $scope.list);
      console.log('$scope.user: ', $scope.user);
      List.addListToUser($scope.list, $scope.user).then(function() {
        $scope.populateLists();
        $scope.list = {                 //resets the list to empty values
          title: '',
          date: '',
        };
      });
    } else {
      console.log('There is no user signed in right now.');
    }
  };

  $scope.populateLists = function() {
    if ($rootScope.signedIn) {
      $scope.list = List.getUserLists($rootScope.currentUser.id);
    }
  };
  
  $scope.updateListItem = function(listId, key, value) {
    if ($rootScope.signedIn) {
      List.updateListItem(listId, key, value, $scope.user);
    } else {
      console.log('There is no user signed in right now.');
    }
  };

  $scope.deleteList = function (listId) {
    if ($rootScope.signedIn) {
      var userId = $rootScope.currentUser.id;
      List.deleteListFromUser(listId, userId);
    } else {
      console.log('There is no user signed in right now.');
    }
  };

});