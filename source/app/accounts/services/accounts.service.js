/**
 * Accounts
 * @namespace app.accounts.services
 */
(function () {
    'use strict';

    angular
        .module('app.accounts.services')
        .service('Accounts', Accounts);

    Accounts.$inject = ['$http'];

    /**
     * @namespace Accounts
     * @returns {Service}
     */
    function Accounts($http) {
        var loginModal = null;
        var registerModal = null;

        function startLogin() {
            loginModal = $modal.open({
                templateUrl: '/source/app/accounts/partials/login.html' 
                controller: 'LoginController'
            });
        }
            
        function startRegistration() {
            registerModal = $modal.open({
                templateUrl: '/source/app/accounts/partials/register.html' 
                controller: 'RegisterController'
            });
        }
        function endLogin() {
            if (loginModal !== null){
                loginModal.close();
            }
            registerModal = null;
        }
        function endRegistration() {
            if (registerModal !== null){
                registerModal.close();
            }
            registerModal = null;
        }

    }

})();
