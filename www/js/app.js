(function(){
  'use strict';
  angular.module('evernode', ['ionic', 'angularFileUpload', 'evernode.controllers', 'evernode.services'])
  .run(function($rootScope, $ionicPlatform, $http){
    $ionicPlatform.ready(function(){

      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    $http.get('http://localhost:3000/status').then(function(response){
      $rootScope.rootuser = response.data;
    }, function(){
      $rootScope.rootuser = null;
    });

  })
  .config(function($stateProvider, $urlRouterProvider, $httpProvider){

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.notes', {
        url: '/notes?page&filter',
        views: {
          'tab-notes': {
            templateUrl: 'templates/tab-notes.html',
            controller: 'NotesCtrl'
          }
        }
      })

      .state('tab.note-detail', {
        url: '/notes/:noteId',
        views: {
          'tab-notes': {
            templateUrl: 'templates/note-detail.html',
            controller: 'NoteDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

    // set http to use cookies
    $httpProvider.defaults.withCredentials = true;
  });

})();


