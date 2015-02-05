(function() {
  'use strict';

  angular
    .module('notesApp.notesController', [])
    .controller('NotesController', NotesController);

  NotesController.$inject = ['NoteService'];

  function NotesController(NoteService) {
    var vm = this;

    $('.notearea').autosize();

    vm.addNote = addNote;
    vm.clearError = clearError;

    function addNote(isValid) {
      if (isValid) {
        authenticate('login');
      }
      vm.loading = true;
      NoteService
      .new(vm.data)
      .then(function(data) {
        vm.loading = false;
        if (data.success) {
          $location.path('/');
        } else {
          vm.error = data.message;
        }
      });
    }

    function clearError() {
      vm.error = '';
    }
  }
})();