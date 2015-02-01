(function() {
  'use strict';

  angular
    .module('notesApp.notesController', [])
    .controller('NotesController', NotesController);

  function NotesController() {
    var vm = this;

    $('.notearea').autosize();
  }
})();