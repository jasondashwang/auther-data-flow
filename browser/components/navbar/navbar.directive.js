'use strict';

app.directive('navbar', function ($state, $location, AuthFactory, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: '/browser/components/navbar/navbar.html',
    link: function (scope) {
      scope.pathStartsWithStatePath = function (state) {
        var partial = $state.href(state);
        var path = $location.path();
        return path.startsWith(partial);
      };

      scope.logout = function() {
        AuthFactory.logout()
        .then(function(res) {
          return AuthFactory.checkStatus();

        })
        .then(function(data){
          $rootScope.loggedIn = data.loggedIn;
          $state.go('home');
        });
      };
    }
  }
});
