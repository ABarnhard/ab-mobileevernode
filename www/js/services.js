(function(){
  'use strict';

  angular.module('evernode.services', [])

  .factory('Friends', function(){
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var friends = [
      {id: 0, name: 'Scruff McGruff'},
      {id: 1, name: 'G.I. Joe'},
      {id: 2, name: 'Miss Frizzle'},
      {id: 3, name: 'Ash Ketchum'}
    ];

    return {
      all: function(){
        return friends;
      },
      get: function(friendId){
        // Simple index lookup
        return friends[friendId];
      }
    };
  })

  .factory('User', function($http, origin){
    function login(user){
      return $http.post(origin + '/login', user);
    }

    function logout(){
      return $http.delete(origin + '/logout');
    }

    return {login:login, logout:logout};
  })

  .factory('Note', ['$http', '$upload', 'origin', function($http, $upload, origin){
    function create(note, files){
      var noteData = {
          url: origin + '/notes',
          method: 'POST',
          data: note,
          file: files,
          fileFormDataName: 'photos'
      };

      return $upload.upload(noteData);
    }

    function query(limit, offset, filter){
      limit  = limit  || 10;
      offset = offset || 0;
      filter = filter || '%';
      // console.log(origin);
      return $http.get(origin + '/notes?limit=' + limit + '&offset=' + offset + '&filter=' + filter);
    }

    function findOne(noteId){
      // console.log(noteId);
      return $http.get(origin + '/notes/' + noteId);
    }

    function nuke(noteId){
      return $http.delete(origin + 'notes/' + noteId);
    }

    return {create:create, query:query, findOne:findOne, nuke:nuke};
  }]);
})();

