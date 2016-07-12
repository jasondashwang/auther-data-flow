'use strict'

app.factory('AuthFactory', function($http, $q) {
  var authObj = {};

  authObj.login = function(loginReq) {
    return $http.post('/login', loginReq);
  }

  authObj.signup = function(signupReq) {
    return $http.post('/api/users', signupReq)
  }

  authObj.logout = function() {
    return $http.get('/logout');
  }
  return authObj;
})
