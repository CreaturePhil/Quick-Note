(function() {
  'use strict';

  var VALID_USERNAME_REGEX = /^[A-Za-z0-9]*$/;

  angular
    .module('notesApp.formDirective', []) 
    .directive('nonspecial', nonspecial)
    .directive('avaliable', avaliable);

    avaliable.$inject = ['$q'];

    function nonspecial() {
      return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
          ctrl.$validators.nonspecial = function(modelValue, viewValue) {
            if (ctrl.$isEmpty(modelValue)) return true;
            if (!VALID_USERNAME_REGEX.test(viewValue)) return false;
            return true;
          };
        }
      };
    }

    function avaliable($q) {
      return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
          var usernames = ['admin']; // TEMPORARY, INJECT SERVICE TO FETCH FOR USERNAMES ON THE SERVER

          ctrl.$asyncValidators.avaliable = function(modelValue, viewValue) {
            if (ctrl.$isEmpty(modelValue)) return $q.when();

            var def = $q.defer();

            if (usernames.indexOf(modelValue.toLowerCase()) === -1) {
              // The username is available
              def.resolve();
            } else {
              def.reject();
            }

            return def.promise;
          };
        }
      };
    }
})();