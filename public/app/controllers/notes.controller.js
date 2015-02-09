(function() {
  'use strict';

  angular
    .module('notesApp.notesController', [])
    .controller('NotesController', NotesController);

  NotesController.$inject = ['Note'];

  function NotesController(Note) {
    var vm = this;

    $('.notearea').autosize();

    vm.notes = [];
    vm.addNote = addNote;
    vm.clearError = clearError;

    var fetchNotes = function() {
      Note
        .index()
        .then(function(data) {
           if (data.success) {
             vm.notes = data.notes;
           } else {
             vm.error = data.message;
           }
        });
    };

    fetchNotes();

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
