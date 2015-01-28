(function() {
  'use strict'; 

  angular
    .module('notesApp.routes', ['ngRoute'])
    .config(routeConfiguration);

  routeConfiguration.$inject = ['$routeProvider', '$locationProvider'];

  function routeConfiguration($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/home.html'
      })
      .when('/about', {
        templateUrl: 'app/views/about.html'
      })
      .when('/signup', {
        templateUrl: 'app/views/signup.html',
        controller: 'authController',
        controllerAs: 'signup',
        restrictLogin: true
      })
      .when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'authController',
        controllerAs: 'login',
        restrictLogin: true
      })
      .when('/404', {
        templateUrl: 'app/views/404.html'
      })
      .otherwise('/404');

    $locationProvider.html5Mode(true);
  }
})();