'use strict'

app.controller('SignupCtrl', function($scope, AuthFactory, $state) {


  $scope.submitSignup = function(signupReq) {
    console.log('hello, we are here!!!!')
    AuthFactory.signup(signupReq)
    .then(function(res) {
      if (res.status === 201) {
        $state.go('stories');
      }
    })
  }
})
