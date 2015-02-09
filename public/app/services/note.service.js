(function() {
  'use strict';

  angular
    .module('notesApp.noteService', [])
    .factory('Note', Note);

  Note.$inject = ['$http'];

  function Note($http) {
    return {
      index: index,
      add: add 
    };

    function index() {
      return $http
        .get('/api/note')
        .then(function(res) {
          return res.data;
        });
    }

    function add(model) {
      return $http
        .post('/api/note', model)
        .then(function(res) {
          return res.data; 
        });
    }
  }
})();
