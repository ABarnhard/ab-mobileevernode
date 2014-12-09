(function(){
  'use strict';

  angular.module('evernode.services', [])

  /**
   * A simple example service that returns some data.
   */
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

  .factory('User', function($http, httpOrigin){
    function login(user){
      return $http.post(httpOrigin + '/login', user);
    }

    function logout(){
      return $http.delete(httpOrigin + '/logout');
    }

    return {login:login, logout:logout};
  })

  .factory('Note', ['$http', '$upload', 'httpOrigin', function($http, $upload, httpOrigin){
    function create(note, files){
      var noteData = {
          url: httpOrigin + '/notes',
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
      console.log(httpOrigin);
      return $http.get(httpOrigin + '/notes?limit=' + limit + '&offset=' + offset + '&filter=' + filter);
    }

    function findOne(noteId){
      return $http.get(httpOrigin + '/notes/' + noteId);
    }

    function nuke(noteId){
      return $http.delete(httpOrigin + 'notes/' + noteId);
    }

    return {create:create, query:query, findOne:findOne, nuke:nuke};
  }]);
})();

