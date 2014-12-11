(function(){
    'use strict';
    angular.module('evernode.controllers', [])

    .controller('DashCtrl', function($scope, Note){

    })

    .controller('NavCtrl', function($rootScope, $scope, $state, User){
        $scope.logout = function(){
            User.logout().then(function(){
                $rootScope.rootuser = null;
                $state.go('tab.account');
            });
        };
    })

    .controller('NotesCtrl', function($scope, $stateParams, Note){
        $scope.pages = [];
        var page   = $stateParams.page || 1,
            offset = (page - 1) * 10;

        Note.query(10, offset, $stateParams.filter).then(function(res){
            //console.log(res.data);
            $scope.pages = [];
            $scope.notes = res.data;
            if($scope.notes.length){
                var noteCount = $scope.notes[0].noteCount,
                    pageCount = Math.ceil(noteCount/10);
                for(var i = 1; i <= pageCount; i++){
                    $scope.pages.push(i);
                }
            }
        },function(){
            console.log('ERROR IN NOTES');
        });

        function success(b64){
            //console.log(b64);
            Note.upload(noteId, b64).then(function(response){
              console.log('image uploaded successfully');
            }, function(response){
              console.log('something went wrong when uploading');
            });
        }

        function error(msg){
            console.log(msg);
        }

        $scope.snap = function(){
            var options = {
              quality: 100,
              destinationType: Camera.DestinationType.DATA_URL
            };
            navigator.camera.getPicture(success, error, options);
        };

        $scope.choose = function(){
            var options = {
              quality: 100,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              destinationType: Camera.DestinationType.DATA_URL
            };
            navigator.camera.getPicture(success, error, options);
        };
    })

    .controller('FriendsCtrl', function($scope, Note){
        Note.query().then(function(res){
            //console.log(res.data);
            $scope.notes = res.data;
        },function(){
            console.log('ERROR IN NOTES');
        });
    })

    .controller('NoteDetailCtrl', function($scope, $stateParams, Note){
      Note.findOne($stateParams.noteId).then(function(res){
        $scope.note = res.data[0];
        console.log($scope.note);
      });
    })

    .controller('AccountCtrl', function($rootScope, $scope, $state, User){
        $scope.login = function(user){
            User.login(user).then(function(res){
                // console.log('raw response', res.data);
                $rootScope.rootuser = res.data;
                // console.log('rootUser', $rootScope.rootuser);
                $state.go('tab.dash');
            },function(res){
                $scope.user = {};
            });
        };
    });
})();

