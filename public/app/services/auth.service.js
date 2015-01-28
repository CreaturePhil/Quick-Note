(function() {
  'use strict';

  angular
    .module('notesApp.authService', [])
    .factory('AuthToken', AuthToken)
    .factory('Auth', Auth)
    .factory('AuthInterceptor', AuthInterceptor);

    AuthToken.$inject = ['$window'];
    Auth.$inject = ['$http', '$q', 'AuthToken'];
    AuthInterceptor.$inject = ['$q', '$location', 'AuthToken'];

    function AuthToken($window) {
      return {
        getToken: getToken,
        setToken: setToken
      };

      function getToken() {
        return $window.localStorage.getItem('token');
      }

      function setToken(token) {
        if (!token) $window.localStorage.removeItem('token');
        $window.localStorage.setItem('token', token);
      }
    }

    function Auth($http, $q, AuthToken) {
      return {
        authenticate: authenticate,
        logout: logout,
        isLoggedIn: isLoggedIn
      };

      function authenticate(url, username, password) {
        return $http
        .post('/' + url, { username: username, password: password })
        .then(function(data) {
          AuthToken.setToken(data.token);
          return data;
        });
      }

      function logout() {
        AuthToken.setToken();
      }

      function isLoggedIn() {
        if (!AuthToken.getToken()) return false;
        return true;
      }
    }

    function AuthInterceptor($q, $location, AuthToken) {
      return {
        request: request,
        responseError: responseError
      };

      function request(config) {
        var token = AuthToken.getToken();
        
        if (token) {
          config.headers['X-Access-Token'] = token;
        }

        return config;
      }

      function responseError(response) {
        if (response.status === 403) {
          $location.path('/login');
        }

        return $q.reject(response);
      }
    }
})();