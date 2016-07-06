/**
 * LoginController
 * @namespace app.accounts.controllers
 */
(function () {
    'use strict';

    angular
        .module('app.accounts.controllers')
        .controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$modalInstance', 'User'];
function LoginController($scope, $modalInstance, User) {

    // save this through a refresh
    $scope.loginForm = {

        email: "",
        password: "",
        errors: []
    };
    $scope.login = function(loginForm) {
        $scope.loginForm.errors = [];

        User.login(loginForm).success(function( data ){

            if( data.success ){

                var user = data.user;

                $modalInstance.close();

                User.SetCredentials( user.id, user.email, user.userType );
            }
            else{

                $scope.loginForm.errors.push( "Invalid user credentials" );
            }

        }).error( function(error){

            $scope.loginForm.errors.push( "Invalid user credentials" );
        });

    };
}
