var AuthRoutes = angular.module('AuthRoutes', ['ngRoute']);

AuthRoutes.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'partials/auth/login',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'partials/auth/signup',
      controller: 'AuthController'
    })
    .when('/special-page', {
      templateUrl: 'partials/auth/signup',
      controller: 'AuthController',
      resolve: {
        loggedIn: ['AuthService', function(AuthService) {
          return AuthService.checkLoggedIn();
        }]
      }
    })
    .otherwise({redirectTo: '/'});
}]);
