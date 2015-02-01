(function() {
  'use strict';

  angular
    .module('notesApp', ['notesApp.routes', 'notesApp.authService', 'notesApp.mainController', 'notesApp.notesController', 'notesApp.formDirective'])
    .config(addAuthInterceptor)
    .run(checkAuthentication);

    addAuthInterceptor.$inject = ['$httpProvider'];
    checkAuthentication.$inject = ['$rootScope', '$location', 'Auth'];

    function addAuthInterceptor($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    }

    function checkAuthentication($rootScope, $location, Auth) {
      $rootScope.$on('$routeChangeStart', function(event, next) {
        if (!Auth.isLoggedIn() && next.loginRequired) {
          $rootScope.savedLocation = $location.url();
          $location.path('/login');
        } else if (Auth.isLoggedIn() && next.restrictLogin) {
          $location.path('/');
        }
      });
    }
})();