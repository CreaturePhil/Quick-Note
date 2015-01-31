(function() {
  'use strict';

  angular
    .module('notesApp.mainController', [])
    .controller('MainCtrl', MainController);

    MainController.$inject = ['$location', 'Auth'];

    function MainController($location, Auth) {
      var vm = this;

      vm.signup = signup;
      vm.login = login;
      vm.logout = logout;
      vm.isLoggedIn = Auth.isLoggedIn;
      vm.clearError = clearError;

      function authenticate(url) {
        vm.loading = true;
        Auth
        .authenticate(url, vm.data.username, vm.data.password)
        .then(function(data) {
          vm.loading = false;
          if (data.success) {
            $location.path('/');
          } else {
            vm.error = data.message;
          }
        });
      }

      function signup(isValid) {
        if (isValid && vm.data.password === vm.data.confirmPassword) {
          authenticate('signup');
        } else {
          vm.error = 'Passwords do not match.';
        }
      }

      function login(isValid) {
        if (isValid) {
          authenticate('login');
        }
      }

      function logout() {
        Auth.logout();
        $location.path('/');
      }

      function clearError() {
        vm.error = '';
      }
    }
})();