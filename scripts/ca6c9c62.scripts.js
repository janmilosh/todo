"use strict";var app=angular.module("todoApp",["ngCookies","ngResource","ngSanitize","ngRoute","firebase"]).constant("FIREBASE_URL","https://milosh-todo.firebaseio.com/");app.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/tasks.html",controller:"TasksCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"AuthCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"AuthCtrl"}).otherwise({redirectTo:"/"})}]),app.controller("TasksCtrl",["$scope","Task","$timeout",function(a,b,c){a.now=Date.now();var d=function(){a.now=Date.now(),c(d,6e4)};d(),a.tasks=b.all,a.task={title:"",date:"",description:"",lists:[]},a.createTask=function(){a.task.date=Date.now(),b.create(a.task).then(function(){a.task={title:"",date:"",description:"",lists:[]}})},a.updateTask=function(a){b.update(a)},a.deleteTask=function(a){b.delete(a)}}]),app.factory("Task",["$firebase","FIREBASE_URL",function(a,b){var c=new Firebase(b+"tasks"),d=a(c),e={all:d,create:function(a){return d.$add(a)},find:function(a){return d.$child(a)},update:function(a){return d.$save(a)},"delete":function(a){return d.$remove(a)}};return e}]),app.controller("AuthCtrl",["$scope","$rootScope","$location","Auth",function(a,b,c,d){a.login=function(){a.error=null,d.login(a.user).then(function(d){b.currentUser=d,console.log("current user: ",b.currentUser),a.resetForm(),c.path("/")},function(b){a.error=b.toString()})},a.register=function(){a.error=null,console.log("passwordMissmatch: ",b.passwordMissmatch),d.register(a.user).then(function(e){d.login(a.user),b.currentUser=e,a.resetForm(),c.path("/")},function(b){a.error=b.toString()})},a.resetForm=function(){a.user={email:"",password:"",passwordConfirmation:""}}}]),app.factory("Auth",["$firebaseSimpleLogin","FIREBASE_URL","$rootScope","$location",function(a,b,c,d){var e=new Firebase(b),f=a(e);c.passwordMissmatch=!1;var g={register:function(a){return a.password===a.passwordConfirmation?(c.passwordMissmatch=!1,f.$createUser(a.email,a.password)):void(c.passwordMissmatch=!0)},login:function(a){return f.$login("password",{email:a.email,password:a.password,rememberMe:!0})},logout:function(){f.$logout()}};return c.$on("$firebaseSimpleLogin:login",function(a,b){c.currentUser=b,console.log("User "+b.email+" successfully logged in!"),c.signedIn=!0}),c.$on("$firebaseSimpleLogin:logout",function(){delete c.currentUser,console.log("Logout event fired."),c.signedIn=!1,d.path("/login")}),g}]),app.controller("NavCtrl",["$rootScope","$scope","$location","Auth",function(a,b,c,d){b.logout=function(){d.logout()},a.$on("$firebaseSimpleLogin:logout",function(){c.path("/login")})}]);