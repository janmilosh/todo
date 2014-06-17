"use strict";var app=angular.module("todoApp",["ngCookies","ngResource","ngSanitize","ngRoute","firebase"]).constant("FIREBASE_URL","https://milosh-todo.firebaseio.com/");app.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/tasks.html",controller:"TasksCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"AuthCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"AuthCtrl"}).otherwise({redirectTo:"/"})}]),app.controller("TasksCtrl",["$scope","$rootScope","$timeout","$location","Task","Auth","User",function(a,b,c,d,e,f,g){a.focusOnTitle=!0,b.$on("$firebaseSimpleLogin:login",function(c,d){b.currentUser=d,a.user=g.getCurrentUser(b.currentUser.id),b.signedIn=!0,a.populateTasks()}),b.$on("$firebaseSimpleLogin:logout",function(){b.signedIn=!1,delete b.currentUser,d.path("/login")}),a.now=Date.now();var h=function(){a.now=Date.now(),c(h,6e4)};h(),a.task={title:"",date:"",description:"",lists:[],user:""},a.$on("$routeChangeSuccess",function(){b.signedIn?a.populateTasks():console.log("Waiting for firebase login event to occur.")}),a.populateTasks=function(){a.userTasks=g.getUserTasks(b.currentUser.id),a.userTasks.$on("loaded",function(){a.tasks={};var b=0;angular.forEach(a.userTasks,function(c,d){c===!0&&(a.tasks[b]=e.find(d),b+=1)})})},a.createTask=function(){if(b.signedIn){a.task.date=Date.now(),a.task.user=b.currentUser.email;var c=b.currentUser.id;e.create(a.task).then(function(b){a.taskId=b.name(),g.addTaskToUser(c,a.taskId),a.task={title:"",date:"",description:"",lists:[],user:""},a.populateTasks(),a.focusOnTitle=!0})}else console.log("There is no user signed in right now.")},a.updateTask=function(a,c,d){b.signedIn?e.update(a,c,d):console.log("There is no user signed in right now.")},a.deleteTask=function(c){if(b.signedIn){var d=b.currentUser.id;e.delete(c),g.deleteTaskFromUser(d,c),a.populateTasks()}else console.log("There is no user signed in right now.")}}]),app.factory("Task",["$firebase","FIREBASE_URL",function(a,b){var c=new Firebase(b+"tasks"),d=a(c),e={create:function(a){return d.$add(a)},find:function(a){return d.$child(a)},update:function(a,b,c){d.$child(a).$child(b).$set(c)},"delete":function(a){d.$remove(a)}};return e}]),app.controller("AuthCtrl",["$scope","$rootScope","$location","Auth","User",function(a,b,c,d,e){a.login=function(){a.error=null,d.login(a.user).then(function(){a.resetForm(),c.path("/")},function(b){a.error=b.toString()})},a.register=function(){a.error=null,d.register(a.user).then(function(b){e.create(b),a.login(a.user),a.resetForm()},function(b){a.error=b.toString()})},a.resetForm=function(){a.user={email:"",password:"",passwordConfirmation:""}}}]),app.factory("Auth",["$firebaseSimpleLogin","FIREBASE_URL","$rootScope","$location",function(a,b,c,d){var e=new Firebase(b),f=a(e);c.passwordMissmatch=!1;var g={register:function(a){return a.password===a.passwordConfirmation?(c.passwordMissmatch=!1,f.$createUser(a.email,a.password)):void(c.passwordMissmatch=!0)},login:function(a){return f.$login("password",{email:a.email,password:a.password,rememberMe:!0})},logout:function(){f.$logout(),c.signedIn=!1,delete c.currentUser,d.path("/login")}};return g}]),app.controller("NavCtrl",["$scope","$rootScope","$location","Auth",function(a,b,c,d){b.$on("$firebaseSimpleLogin:login",function(a,c){b.currentUser=c,b.signedIn=!0}),b.$on("$firebaseSimpleLogin:logout",function(){b.signedIn=!1,b.currentUser=null,c.path("/login")}),a.logout=function(){d.logout(),b.currentUser=null,c.path("/login")}}]),app.factory("User",["$firebase","FIREBASE_URL",function(a,b){var c=new Firebase(b+"users"),d=a(c),e={create:function(a){d[a.id]={email:a.email,md5_hash:a.md5_hash},d.$save()},addTaskToUser:function(a,b){var c=d.$child(a);c.$child("tasks").$child(b).$set(!0)},deleteTaskFromUser:function(a,b){var c=e.getCurrentUser(a);c.$child("tasks").$remove(b)},getUserTasks:function(a){var b=e.getCurrentUser(a);return b.$child("tasks")},getCurrentUser:function(a){return d.$child(a)}};return e}]);