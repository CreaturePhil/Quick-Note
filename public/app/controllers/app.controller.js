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

      function authenticate(url) {
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

      function signup(isValid) {
        if (isValid && vm.data.password === vm.data.confirmPassword) {
          alert('it work !');
        } else {
          vm.error = 'Passwords do not match.';
        }
      }

      function login(isValid) {
        if (isValid) {
          alert('it work!');
        }
      }

      function logout() {
        Auth.logout();
        $location.path('/');
      }
    }
})();