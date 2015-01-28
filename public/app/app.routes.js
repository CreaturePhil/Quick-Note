angular.module('notesApp.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/home.html'
    })
    .when('/about', {
      templateUrl: 'app/views/about.html'
    })
    .when('/404', {
      templateUrl: 'app/views/404.html'
    })
    .otherwise('/404');

  $locationProvider.html5Mode(true);
});