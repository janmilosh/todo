"use strict";var app=angular.module("todoApp",["ngCookies","ngResource","ngSanitize","ngRoute","firebase"]).constant("FIREBASE_URL","https://milosh-todo.firebaseio.com/");app.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/tasks.html",controller:"TasksController"}).when("/register",{templateUrl:"views/register.html",controller:"AuthController"}).when("/login",{templateUrl:"views/login.html",controller:"AuthController"}).otherwise({redirectTo:"/"})}]),app.controller("TasksController",["$scope","Task",function(a,b){a.now=Date.now(),a.tasks=b.all,a.task={title:"",date:"",description:"",tags:[]},a.createTask=function(){a.task.date=Date.now(),b.create(a.task).then(function(){a.task={title:"",date:"",description:"",tags:[]}})},a.updateTask=function(a){b.update(a)},a.deleteTask=function(a){b.delete(a)}}]),app.factory("Task",["$firebase","FIREBASE_URL",function(a,b){var c=new Firebase(b+"tasks"),d=a(c),e={all:d,create:function(a){return d.$add(a)},find:function(a){return d.$child(a)},update:function(a){return d.$save(a)},"delete":function(a){return d.$remove(a)}};return e}]),app.controller("AuthController",["$scope","$location","Auth",function(a,b,c){c.signedIn()&&b.path("/"),a.$on("$firebaseSimpleLogin:login",function(){b.path("/")}),a.login=function(){c.login(a.user).then(function(){b.path("/")},function(b){a.error=b.toString()})},a.register=function(){try{c.register(a.user).then(function(a){console.log("Registered User:",a),b.path("/login")},function(b){a.error=b.toString()})}catch(d){console.log(d)}}}]),app.factory("Auth",["$firebaseSimpleLogin","FIREBASE_URL","$rootScope",function(a,b,c){var d=new Firebase(b),e=a(d),f={register:function(a){return a.password===a.passwordConfirmation?(c.passwordMissmatch=!1,e.$createUser(a.email,a.password)):void(c.passwordMissmatch=!0)},signedIn:function(){return null!==e.user},login:function(a){return e.$login("password",a)},logout:function(){e.$logout()}};return c.signedIn=function(){return f.signedIn()},f}]),app.controller("NavController",["$rootScope","$scope","$location","Auth",function(a,b,c,d){b.logout=function(){d.logout()},a.$on("$firebaseSimpleLogin:logout",function(){c.path("/login")})}]);