/**
 * CompaniesController
 * @namespace app.companies.controllers
 */
(function () {
    'use strict';

    angular
        .module('app.companies.controllers')
        .controller('CompanyController', CompanyController);

    CompanyController.$inject = [ '$routeParams', '$scope', '$timeout', 'Companies', 'User', 'Votes'];

    /**
     * @namespace CompaniesController
     */
    function CompanyController( $routeParams, $scope, $timeout, Companies, User, Votes) {

        activate();

        function activate() {
            //console.log('activated companies controller!');
        }

        Companies.get($routeParams.company_id).success(function (company) {

            console.log( company );

            $scope.company = company;
        });

        $scope.vote = function vote(company) {

            var current = User.getCurrentUser();

            if (current.userType === "Fellow") {

                $scope.loading = true;

                return Votes.create(current.id, company.user_id)
                    .success(function (vote) {

                        console.log("success: "+vote);
                        return vote;
                    })
                    .catch(function (err) {

                        console.log("Error: "+err);
                    })
                    .finally(function () {

                        $timeout(function () {

                            console.log( 'done' );
                            $scope.loading = false;
                            $scope.done = true;

                        }, 1500);
                    });
            }
        };

    }

})();
