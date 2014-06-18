'use strict';
/* global app:true */

var app = angular.module('todoApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase'
  ])
  .constant('FIREBASE_URL', 'https://milosh-todo.firebaseio.com/');

app.config(function ($routeProvider) {
  $routeProvider
    .when('/tasks', {
      templateUrl: 'views/tasks.html',
      controller: 'TasksCtrl'
    })
    .when('/', {
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
    .otherwise({
      redirectTo: '/'
    });
});
