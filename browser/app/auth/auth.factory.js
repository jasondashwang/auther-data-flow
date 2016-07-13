'use strict'

app.factory('AuthFactory', function($http, $q, $rootScope) {
  var authObj = {};


  authObj.login = function(loginReq) {
    return $http.post('/login', loginReq)
    .then(function(res){
      $rootScope.sessionUser = res.data;
      return res;
    });
  };

  authObj.signup = function(signupReq) {
    return $http.post('/api/users', signupReq);
  };

  authObj.logout = function() {
    $rootScope.sessionUser = null;
    return $http.get('/logout');
  };

  return authObj;
})
