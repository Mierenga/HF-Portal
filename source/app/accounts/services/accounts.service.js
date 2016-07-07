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

        return {
            startLogin: startLogin,
            startRegistration: startRegistration,
            endLogin: endLogin,
            endRegistration: endRegistration
        };

        function startLogin() {
            loginModal = $modal.open({
                templateUrl: '/source/app/accounts/partials/login.html' 
                controller: 'LoginController'
            });
            loginModal.result.then(function(){
                updateLoginStatus();
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
            loginModal = null;
        }
        function endRegistration() {
            if (registerModal !== null){
                registerModal.close();
            }
            registerModal = null;
        }

    }
})();
