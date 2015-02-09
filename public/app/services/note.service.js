(function() {
  'use strict';

  angular
    .module('notesApp.noteService', [])
    .factory('Note', Note);

  Note.$inject = ['$http'];

  function Note($http) {
    return {
      add: add 
    };

    function add(model) {
      return $http
        .post('/api/note', model)
        .then(function(res) {
          return res.data; 
        });
    }
  }
})();
