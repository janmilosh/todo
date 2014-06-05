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
    .when('/', {
      templateUrl: 'views/tasks.html',
      controller: 'TasksController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
