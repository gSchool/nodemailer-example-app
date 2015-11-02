App.factory('AuthService', ['$q', '$timeout', '$http', '$location', '$rootScope', 
  function ($q, $timeout, $http, $location, $rootScope) {
    var service = {};

    service.userObj = function (user) {
      return { id: user._id, email: user.email };
    }

    service.getUser = function () {
      var deferred = $q.defer();
      var self = this;

      $http.get('/loggedin').success(function (user) {
        if ( user !== '0' ) { $rootScope.currentUser = self.userObj(user) };
        deferred.resolve();
      });

      return deferred.promise;
    };

    service.checkLoggedIn = function () {
      var deferred = $q.defer();

      $http.get('/loggedin').success(function (user) {
        if ( user !== '0' ) {
          $rootScope.currentUser = this.userObj(user);
          deferred.resolve();
        } else {
          $rootScope.loginMessage = 'You must log in.';
          deferred.reject();
          $location.url('/login');
        };
      });

      return deferred.promise;
    };

    return service;
  }
]);