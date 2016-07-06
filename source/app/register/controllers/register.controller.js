/**
 * RegisterController
 * @namespace app.register.controllers
 */
(function () {
    'use strict';

    angular
        .module('app.register.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', '$location', 'User'];
    /**
     * @namespace RegisterController
     */
    function RegisterController($scope, $location, User) {
        
        if (User.isUserLoggedIn()) {
            $location.path("/");
            return;
        }

    }
})();