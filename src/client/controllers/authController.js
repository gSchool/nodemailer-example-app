App.controller('AuthController', ['$location', '$rootScope', '$scope', 'HTTPService', function ($location, $rootScope, $scope, HTTPService) {
  $scope.user = {};

  $scope.login = function () {
    HTTPService.post('/login', $scope.user).then(function (response) {
      if ( response.data.user ) {
        $rootScope.currentUser = response.data.user;
        $location.path('/');
      } else { $scope.message = response.data.message };
    });
  };

  $scope.signup = function () {
    HTTPService.post('/signup', $scope.user).then(function (response) {
      if ( response.data.user ) {
        $rootScope.currentUser = response.data.user;
        $location.path('/');
      } else { $scope.message = response.data.message };
    });
  };
}]);