'use strict';
 
app.controller('ListsCtrl', function ($scope, $routeParams, Post, User) {
    $scope.user = User.findByUsername($routeParams.username);
});
