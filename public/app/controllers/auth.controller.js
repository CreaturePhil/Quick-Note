(function() {
  'use strict';

  angular
    .module('notesApp.authController', [])
    .controller('authController', authController);

    authController.$inject = ['$location', 'Auth'];

    function authController() {
      var vm = this;

      vm.signup = authenticate('/signup');
      vm.login = authenticate('/login');
      vm.logout = logout;

      function authenticate(url) {
        return function() {
          Auth
          .authenticate(url, vm.data.username, vm.data.password)
          .then(function(data) {
            if (data.sucess) {
              $location.path('/');
            } else {
              vm.error = data.message;
            }
          });
        }
      }

      function logout() {
        Auth.logout();
        $location.path('/');
      }
    }
})();