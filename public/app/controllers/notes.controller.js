(function() {
  'use strict';

  angular
    .module('notesApp.notesController', [])
    .controller('NotesController', NotesController);

  NotesController.$inject = ['$log'];

  function NotesController($log) {
    var vm = this;

    $('.notearea').autosize();

    vm.addNote = addNote;
    vm.clearError = clearError;

    function addNote(isValid) {
      if (isValid && vm.data.title.indexOf('@') < 0) {
        $log.log(vm.data);
        NoteService
          .new({
            title: vm.data.title || 'Untitled',
            visibility: vm.data.visibility,
            content: vm.data.note
          })
        // .then(function(data) {
        //   vm.loading = false;
        //   if (data.success) {
        //     $location.path('/');
        //   } else {
        //     vm.error = data.message;
        //   }
        // });
      } else {
        vm.error = 'Something bad happen!';
      }
    }

    function clearError() {
      vm.error = '';
    }
  }
})();