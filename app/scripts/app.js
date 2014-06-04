'use strict';
/* global app:true */

var app = angular.module('todoApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ]);

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
