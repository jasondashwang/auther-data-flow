'use strict';

var app = angular.module('auther', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
});


app.controller('mainController', function(AuthFactory, $scope, $rootScope){
  AuthFactory.checkStatus()
  .then(function(data){
    $rootScope.loggedIn = data.loggedIn;
  })

});
