var App = angular.module('App', ['AuthRoutes', 'ngRoute']);

App.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home',
      resolve: {
        getUser: ['AuthService', function(AuthService) {
          return AuthService.getUser();
        }]
      }
    })
    .otherwise({redirectTo: '/'});
}]);
