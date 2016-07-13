'use strict'

app.controller('LoginCtrl', function($scope, AuthFactory, $state, $rootScope) {


  $scope.submitLogin = function(loginReq) {
    AuthFactory.login(loginReq)
    .then(function(res) {
      if (res.status === 200) {
        return AuthFactory.checkStatus()
      }
    })
    .then(function(data){
      $rootScope.loggedIn = data.loggedIn;
      $state.go('stories');
    })
  }

})
