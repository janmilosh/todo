'use strict';
/* global app:true */

var app = angular.module('todoApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase'
  ])
  .constant('FIREBASE_URL', 'https://milosh-todo.firebaseio.com/');

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/info.html',
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
    .when('/info', {
      templateUrl: 'views/info.html',
    })
    .otherwise({
      redirectTo: '/'
    });
});
