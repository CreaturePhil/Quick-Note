(function() {
  'use strict';

  angular
    .module('notesApp.mainController', [])
    .controller('MainCtrl', MainController);

    MainController.$inject = ['$location', 'Auth'];

    function MainController($location, Auth) {
      var vm = this;

      vm.signup = authenticate('/signup');
      vm.login = authenticate('/login');
      vm.logout = logout;
      vm.isLoggedIn = Auth.isLoggedIn;

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