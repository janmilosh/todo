'use strict';
/* global app:true */

var app = angular.module('todoApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase'
  ])
  .constant('FIREBASE_URL', 'https://milosh-todo.firebaseio.com/');

app.config(function ($routeProvider, $locationProvider) {
  
  $locationProvider.html5Mode(false).hashPrefix('!');

  $routeProvider
    .when('/', {
      templateUrl: 'views/about.html'
    })
    .when('/tasks', {
      templateUrl: 'views/tasks.html',
      controller: 'TasksCtrl'
    })
    .when('/task/:taskId', {
      templateUrl: 'views/task-detail.html',
      controller: 'TaskDetailCtrl'
    })
    .when('/list/:listId', {
      templateUrl: 'views/list-detail.html',
      controller: 'ListDetailCtrl'
    })
    .when('/lists', {
      templateUrl: 'views/lists.html',
      controller: 'ListsCtrl'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'AuthCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'AuthCtrl'
    })
    .when('/account', {
      templateUrl: 'views/account.html',
      controller: 'AuthCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html'
    })
    .otherwise({
      redirectTo: '/'
    });
})
.run(function ($window, $rootScope) {
  $rootScope.$on('$routeChangeSuccess', function () {
    $window.scrollTo(0,0);
  });
});
