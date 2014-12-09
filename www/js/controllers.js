(function(){
    'use strict';
    angular.module('evernode.controllers', [])

    .controller('DashCtrl', function($scope, Note){

    })
    .controller('NavCtrl', function($rootScope, $scope, $state, User){
        $scope.logout = function(){
            User.logout().then(function(){
                $rootScope.rootuser = null;
                $state.go('tab.dash');
            });
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

    .controller('FriendDetailCtrl', function($scope, $stateParams, Friends){
      $scope.friend = Friends.get($stateParams.friendId);
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

