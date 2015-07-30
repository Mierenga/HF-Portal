/**
* FellowsController
* @namespace app.fellows.controllers
*/
(function () {
'use strict';

angular
	.module('app.profile.controllers')
	.controller('FellowsProfileController', FellowsProfileController)
	.controller('FellowsProfileModalInstanceController', FellowsProfileModalInstanceController);

    FellowsProfileController.$inject = ['$scope', '$modal', 'Fellows'];
    FellowsProfileModalInstanceController.$inject = ['$scope', '$modalInstance', 'fellow'];

    /**
     * @namespace FellowsController
     */
    function FellowsProfileController($scope, $modal, Fellows) {
        var vm = this;

        activate();

        function activate() {
            console.log('activated fellows controller!')
            //Fellows.all();
        }

        $scope.fellows = Fellows.all();

        $scope.openModal = function(fellow) {

            var modalInstance = $modal.open({

                templateUrl: 'source/app/fellows/partials/fellow_detail_view.html',
                controller: 'FellowsModalInstanceController',
                size: 'lg',
                resolve: {
                    fellow: function(){
                        return fellow;
                    }
                }

            });
        };


    }

    function FellowsProfileModalInstanceController ($scope, $modalInstance, fellow) {


        $scope.fellow = fellow;

        $scope.ok = function () {
            $modalInstance.close($scope.fellow);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }

})();
