/**
* AdminProfileController
* @namespace app.profile.controllers
*/
(function () {
    'use strict';


    angular
    .module('app.profile.controllers')
    .controller('AdminProfileController', AdminProfileController)
    .controller('AdminProfileModalInstanceController', AdminProfileModalInstanceController);

    AdminProfileController.$inject = ['$scope', '$modal'];
    AdminProfileModalInstanceController.$inject = ['$scope', '$modalInstance'];

    /**
     * @namespace AdminProfileController
     */
     function AdminProfileController($scope, $modal) {

        $scope.openModal = function() {

            var modalInstance = $modal.open({

                templateUrl: 'source/app/profile/partials/admin-create-user.html',
                controller: 'AdminProfileModalInstanceController',
                size: 'lg'
                //resolve: {
                //    function(){
                //
                //    }
                //}

            });
        };
    }


    function AdminProfileModalInstanceController ($scope, $modalInstance) {

        function unHighlightField(){

            angular.element(document.getElementsByTagName("input")).removeClass("error");
            angular.element(document.getElementById("userType")).removeClass('error');
        }

        function highlightPasswordField(){

            angular.element(document.getElementById("password")).addClass('error');
        }

        function highlightEmailField(){

            angular.element(document.getElementById("email")).addClass('error');
        }

        function highlightUserTypeField(){

            angular.element(document.getElementById("userType")).addClass('error');
        }

        $scope.ok = function (user) {

            // remove previous highlights in case data is now correct
            unHighlightField();

            // if everything is good log data and close, else highlight error
            var errors = false;
            if(typeof(user) == "undefined"){
                console.log("No info");
                //heighlight all
                highlightEmailField();
                highlightPasswordField();
                highlightUserTypeField();
                errors = true;
            }
            else {

                if(typeof(user.email) == "undefined"){
                    console.log("Bad email");
                    //heighlight email
                    highlightEmailField();
                    errors = true;
                }

                if(typeof(user.password) == "undefined"){
                    console.log("Bad password");
                    //heighlight password
                    highlightPasswordField();
                    errors = true;
                }

                if(typeof(user.userType) == "undefined"){
                    console.log("Bad type");
                    //heighlight button
                    highlightUserTypeField();
                    errors = true;
                }
            }

            if( !errors ){
                console.log(user);
                $modalInstance.close();
            }

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.switchType = function(user){

            if( user.userType === "Company" ){

                angular.element(document.getElementById("optionCompany")).addClass('selected');
                angular.element(document.getElementById("optionFellow")).removeClass('selected');
            }
            else if( user.userType === "Fellow" ){

                console.log("Fellow selection");

                angular.element(document.getElementById("optionCompany")).removeClass('selected');
                angular.element(document.getElementById("optionFellow")).addClass('selected');
            }

        };
    }

})();
