'use strict';
 
app.controller('ListsController', function ($scope, $routeParams, Post, User) {
    $scope.user = User.findByUsername($routeParams.username);
});
