"use strict";var app=angular.module("todoApp",["ngResource","ngSanitize","ngRoute","firebase"]).constant("FIREBASE_URL","https://milosh-todo.firebaseio.com/");app.config(["$routeProvider","$locationProvider",function(a,b){b.html5Mode(!1).hashPrefix("!"),a.when("/",{templateUrl:"views/about.html"}).when("/tasks",{templateUrl:"views/tasks.html",controller:"TasksCtrl"}).when("/task/:taskId",{templateUrl:"views/task-detail.html",controller:"TaskDetailCtrl"}).when("/list/:listId",{templateUrl:"views/list-detail.html",controller:"ListDetailCtrl"}).when("/lists",{templateUrl:"views/lists.html",controller:"ListsCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"AuthCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"AuthCtrl"}).when("/account",{templateUrl:"views/account.html",controller:"AuthCtrl"}).when("/about",{templateUrl:"views/about.html"}).otherwise({redirectTo:"/"})}]).run(["$window","$rootScope",function(a,b){b.$on("$routeChangeSuccess",function(){a.scrollTo(0,0)})}]),app.controller("TasksCtrl",["$scope","$rootScope","$timeout","$location","Task","List",function(a,b,c,d,e,f){b.$on("$firebaseSimpleLogin:login",function(c,d){b.currentUser=d,a.user=b.currentUser.id,a.lists=f.getUserLists(a.user),b.signedIn=!0,a.populateTasks()}),b.$on("$firebaseSimpleLogin:logout",function(){b.signedIn=!1,delete b.currentUser,d.path("/")}),a.now=Date.now();var g=function(){a.now=Date.now(),c(g,6e4)};g(),a.task={title:"",date:"",description:""},a.$on("$routeChangeSuccess",function(){b.signedIn?(a.user=b.currentUser.id,a.lists=f.getUserLists(a.user),a.populateTasks()):console.log("Waiting for firebase login event to occur.")}),a.createTask=function(){b.signedIn?(a.task.date=Date.now(),e.addTaskToUser(a.task,a.user).then(function(b){a.populateTasks(),a.task={title:"",date:"",description:""};var c=b.path.n[3];a.addTaskToInbox(c)})):console.log("There is no user signed in right now.")},a.addTaskToInbox=function(c){b.signedIn&&(f.addTaskToList(c,"inbox",a.user),e.addListToTask(c,"inbox",a.user))},a.populateTasks=function(){b.signedIn&&(a.tasks=e.getUserTasks(b.currentUser.id))},a.updateTaskItem=function(c,d,f){b.signedIn?e.updateTaskItem(c,d,f,a.user):console.log("There is no user signed in right now.")},a.viewTaskDetail=function(a){b.signedIn&&d.path("/task/"+a)},a.viewList=function(a){b.signedIn&&d.path("/list/"+a)},a.taskIsOnList=function(a,b){var c=!1;return angular.forEach(b.tasks,function(b,d){a===d&&(c=!0)}),c}}]),app.factory("Task",["$firebase","FIREBASE_URL",function(a,b){var c=new Firebase(b+"users"),d=a(c),e={addTaskToUser:function(a,b){var c=d.$child(b);return c.$child("tasks").$add(a)},getUserTasks:function(a){var b=d.$child(a);return b.$child("tasks")},deleteTaskFromUser:function(a,b){var c=d.$child(b);c.$child("tasks").$remove(a)},updateTaskItem:function(a,b,c,e){var f=d.$child(e);f.$child("tasks").$child(a).$child(b).$set(c)},findTaskById:function(a,b){var c=d.$child(b);return a?c.$child("tasks").$child(a):null},addListToTask:function(a,b,c){var e=d.$child(c);e.$child("tasks").$child(a).$child("lists").$child(b).$set(!0)},deleteListFromTask:function(a,b,c){var e=d.$child(c);e.$child("tasks").$child(a).$child("lists").$remove(b)}};return e}]),app.controller("AuthCtrl",["$scope","$rootScope","$location","Auth","User",function(a,b,c,d,e){b.$on("$firebaseSimpleLogin:login",function(c,d){b.currentUser=d,a.user=b.currentUser,b.signedIn=!0}),a.$on("$routeChangeSuccess",function(){b.signedIn?a.user=b.currentUser:console.log("Waiting for firebase login event to occur.")}),a.sendResetPasswordEmail=function(){a.resetPasswordError=null,a.message=null,d.resetPassword(a.resetEmail).then(function(){a.reset=!1,a.message="Please check your email for your new temporary password."},function(b){a.resetPasswordError=b.toString(),a.message=null})},a.newPassword=function(){a.error=null,a.message=null,d.changePassword(a.user).then(function(){a.message="Your password has been changed.",a.resetForm()},function(b){console.log("newPassword controller error",b),a.error=b.toString()})},a.showResetInput=function(){a.reset=!0},a.login=function(){a.message=null,a.error=null,d.login(a.user).then(function(){a.resetForm(),c.path("/")},function(b){a.error=b.toString()})},a.register=function(){a.error=null,d.register(a.user).then(function(b){e.create(b),a.login(a.user),a.resetForm()},function(b){a.error=b.toString()})},a.resetForm=function(){a.user={email:"",password:"",passwordConfirmation:"",oldPassword:""}}}]),app.factory("Auth",["$firebaseSimpleLogin","FIREBASE_URL","$rootScope","$location",function(a,b,c,d){var e=new Firebase(b),f=a(e);c.passwordMissmatch=!1;var g={register:function(a){return a.password===a.passwordConfirmation?(c.passwordMissmatch=!1,f.$createUser(a.email,a.password)):void(c.passwordMissmatch=!0)},login:function(a){return f.$login("password",{email:a.email,password:a.password,rememberMe:!0})},logout:function(){f.$logout(),c.signedIn=!1,delete c.currentUser,d.path("/login")},resetPassword:function(a){return f.$sendPasswordResetEmail(a)},changePassword:function(a){return a.password===a.passwordConfirmation?(c.passwordMissmatch=!1,f.$changePassword(a.email,a.oldPassword,a.password)):void(c.passwordMissmatch=!0)}};return g}]),app.controller("NavCtrl",["$scope","$rootScope","$location","Auth",function(a,b,c,d){b.$on("$firebaseSimpleLogin:login",function(a,c){b.currentUser=c,b.signedIn=!0}),b.$on("$firebaseSimpleLogin:logout",function(){b.signedIn=!1,b.currentUser=null,c.path("/")}),a.logout=function(){d.logout(),b.currentUser=null,c.path("/")}}]),app.factory("User",["$firebase","FIREBASE_URL",function(a,b){var c=new Firebase(b+"users"),d=a(c),e=Date.now(),f={create:function(a){d[a.id]={email:a.email,md5_hash:a.md5_hash,lists:{inbox:{title:"Inbox",date:e,position:2},today:{title:"Today",date:e,position:0},soon:{title:"Soon",date:e,position:1}}},d.$save()},getUserTasks:function(a){var b=f.getCurrentUser(a);return b.$child("tasks")},getCurrentUser:function(a){return d.$child(a)}};return f}]),app.factory("List",["$firebase","FIREBASE_URL",function(a,b){var c=new Firebase(b+"users"),d=a(c),e={addListToUser:function(a,b){var c=d.$child(b);return c.$child("lists").$add(a)},getUserLists:function(a){var b=d.$child(a);return b.$child("lists")},findListById:function(a,b){var c=d.$child(b);return a?c.$child("lists").$child(a):null},deleteListFromUser:function(a,b){var c=d.$child(b);c.$child("lists").$remove(a)},updateListItem:function(a,b,c,e){var f=d.$child(e);f.$child("lists").$child(a).$child(b).$set(c)},addTaskToList:function(a,b,c){var e=d.$child(c);e.$child("lists").$child(b).$child("tasks").$child(a).$set(!0)},deleteTaskFromList:function(a,b,c){var e=d.$child(c);e.$child("lists").$child(b).$child("tasks").$remove(a)}};return e}]),app.controller("ListsCtrl",["$scope","$rootScope","$timeout","$location","List",function(a,b,c,d,e){b.$on("$firebaseSimpleLogin:login",function(c,d){b.currentUser=d,a.user=b.currentUser.id,b.signedIn=!0,a.populateLists()}),b.$on("$firebaseSimpleLogin:logout",function(){b.signedIn=!1,delete b.currentUser,d.path("/")}),a.now=Date.now();var f=function(){a.now=Date.now(),c(f,6e4)};f(),a.list={title:"",date:"",position:3},a.$on("$routeChangeSuccess",function(){b.signedIn?(a.user=b.currentUser.id,a.populateLists()):console.log("Waiting for firebase login event to occur.")}),a.createList=function(){b.signedIn&&(a.list.date=Date.now(),e.addListToUser(a.list,a.user).then(function(){a.populateLists(),a.list={title:"",date:"",position:3}}))},a.populateLists=function(){b.signedIn&&(a.lists=e.getUserLists(b.currentUser.id))},a.updateListItem=function(c,d,f){b.signedIn&&e.updateListItem(c,d,f,a.user)},a.viewListDetail=function(a){b.signedIn&&d.path("/list/"+a)}}]),app.directive("setFocus",["$timeout",function(a){return{link:function(b,c){c.bind("click",function(){a(function(){var a=document.getElementsByTagName("input")[0];a.focus()})})}}}]),app.controller("TaskDetailCtrl",["$scope","$rootScope","$routeParams","$location","$timeout","User","Task","List",function(a,b,c,d,e,f,g,h){b.$on("$firebaseSimpleLogin:login",function(c,d){b.currentUser=d,a.user=b.currentUser.id,b.signedIn=!0,a.populateTaskDetails(),a.populateLists()}),b.$on("$firebaseSimpleLogin:logout",function(){b.signedIn=!1,delete b.currentUser,d.path("/")}),a.$on("$routeChangeSuccess",function(){a.populateTaskDetails(),a.populateLists(),a.highlightLists()}),a.edit=!1,a.populateTaskDetails=function(){b.signedIn?(a.user=b.currentUser.id,a.task=g.findTaskById(c.taskId,a.user),a.task&&a.task.$on("loaded",function(){a.highlightLists()})):console.log("in the detail page, not signed in yet")},a.updateTaskItem=function(c,d,e){b.signedIn?g.updateTaskItem(c,d,e,a.user):console.log("There is no user signed in right now.")},a.populateLists=function(){b.signedIn&&(a.lists=h.getUserLists(b.currentUser.id))},a.addOrRemoveTaskFromList=function(b){a.taskIsOnList(b)?a.removeTaskFromList(a.task.$id,b):a.addTaskToList(a.task.$id,b),a.toggleTaskToInbox()},a.taskIsOnList=function(b){var c=!1;return angular.forEach(a.task.lists,function(a,d){b===d&&(c=!0)}),c},a.addTaskToList=function(c,d){b.signedIn&&(h.addTaskToList(c,d,a.user),g.addListToTask(c,d,a.user),a.listsToHighlight[d]=!0)},a.removeTaskFromList=function(c,d){b.signedIn&&(h.deleteTaskFromList(c,d,a.user),g.deleteListFromTask(c,d,a.user),a.listsToHighlight[d]=!1)},a.toggleTaskToInbox=function(){b.signedIn&&(a.task.lists?a.removeTaskFromList(c.taskId,"inbox"):a.addTaskToList(c.taskId,"inbox"))},a.highlightLists=function(){e(function(){a.listsToHighlight={},b.signedIn&&angular.forEach(a.task.lists,function(b,c){angular.forEach(a.lists,function(b,d){return d===c?(a.listsToHighlight[d]=!0,!0):void 0})})})},a.deleteTask=function(c){b.signedIn?(g.deleteTaskFromUser(c,a.user),a.lists=h.getUserLists(b.currentUser.id),angular.forEach(a.lists,function(b,d){angular.forEach(b.tasks,function(b,e){e===c&&h.deleteTaskFromList(c,d,a.user)})}),d.path("/lists/")):console.log("There is no user signed in right now.")}}]),app.controller("ListDetailCtrl",["$scope","$rootScope","$routeParams","$location","User","Task","List",function(a,b,c,d,e,f,g){b.$on("$firebaseSimpleLogin:login",function(c,d){b.currentUser=d,a.user=d,b.signedIn=!0,a.populateListDetails(),a.populateTasks()}),b.$on("$firebaseSimpleLogin:logout",function(){b.signedIn=!1,delete b.currentUser,d.path("/")}),a.$on("$routeChangeSuccess",function(){a.populateListDetails(),a.populateTasks()}),a.task={title:"",date:"",description:""},a.createTodayTask=function(){b.signedIn?(a.task.date=Date.now(),f.addTaskToUser(a.task,a.user.id).then(function(b){a.populateTasks(),a.task={title:"",date:"",description:""};var c=b.path.n[3];a.addTaskToToday(c),a.hasTasks=!0})):console.log("There is no user signed in right now.")},a.addTaskToToday=function(c){b.signedIn&&(g.addTaskToList(c,"today",a.user.id),f.addListToTask(c,"today",a.user.id))},a.populateListDetails=function(){b.signedIn?(a.user=b.currentUser,a.list=g.findListById(c.listId,a.user.id),a.list&&a.list.$on("loaded",function(){a.hasTasks=!!a.list.tasks})):console.log("in the detail page, not signed in yet")},a.updateListItem=function(c,d,e){b.signedIn?g.updateListItem(c,d,e,a.user.id):console.log("There is no user signed in right now.")},a.customList=function(){var a=c.listId;return"inbox"===a||"today"===a||"soon"===a},a.todayList=function(){var a=c.listId;return"today"===a},a.deleteList=function(c){b.signedIn&&(g.deleteListFromUser(c,a.user.id),a.tasks=f.getUserTasks(a.user.id),angular.forEach(a.tasks,function(b,d){var e=0,h=!1;angular.forEach(b.lists,function(b,g){g===c&&(f.deleteListFromTask(d,c,a.user.id),h=!0),e+=1}),1===e&&h&&(g.addTaskToList(d,"inbox",a.user.id),f.addListToTask(d,"inbox",a.user.id))}),d.path("/lists/"))},a.taskIsOnList=function(b){var c=!1;return angular.forEach(a.list.tasks,function(a,d){b===d&&(c=!0)}),c},a.populateTasks=function(){b.signedIn&&(a.tasks=f.getUserTasks(a.user.id))},a.viewTaskDetail=function(a){b.signedIn&&d.path("/task/"+a)}}]);