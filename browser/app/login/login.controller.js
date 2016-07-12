'use strict'

app.controller('LoginCtrl', function($scope, AuthFactory, $state) {


  $scope.submitLogin = function(loginReq) {
    AuthFactory.login(loginReq)
    .then(function(res) {
      if (res.status === 200) {
        $state.go('stories');
      }
    })
  }
})
