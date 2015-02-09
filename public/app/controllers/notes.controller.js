(function() {
  'use strict';

  angular
    .module('notesApp.notesController', [])
    .controller('NotesController', NotesController);

  NotesController.$inject = ['Note'];

  function NotesController(Note) {
    var vm = this;

    $('.notearea').autosize();

    vm.addNote = addNote;
    vm.clearError = clearError;

    function addNote(isValid) {
      if (isValid) {
        Note
          .add({
            title: vm.data.title || 'Untitled',
            visibility: vm.data.visibility,
            content: vm.data.note
          })
         .then(function(data) {
           vm.loading = false;
           if (data.success) {
             vm.data.title = '';
             vm.data.note = '';
           } else {
             vm.error = data.message;
           }
         });
      } else {
        vm.error = 'Something bad happen!';
      }
    }

    function clearError() {
      vm.error = '';
    }
  }
})();
