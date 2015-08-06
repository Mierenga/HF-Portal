/**
* CompanyProfileController
* @namespace app.profile.controllers
*/
(function () {
    'use strict';

    angular
    .module('app.profile.controllers')
    .controller('CompanyProfileController', CompanyProfileController);

    CompanyProfileController.$inject = ['$scope', 'Companies'];

    /**
    * @namespace CompanyProfileController
    */
    function CompanyProfileController($scope, Companies) {
        var vm = this;

        var tempID = 4; //TODO change to not hard coded

        Companies.get(tempID).success(function(company){
            $scope.company = company;
        });

        // $scope.company= {
        //     img:"public/assets/images/placeholder-hi.png"
        // };



        $(".js-example-tokenizer").select2({
          tags: true,
          tokenSeparators: [',', ' ']

        });

        activate();

        function activate() {
            console.log('activated profile controller!');
            //Profile.all();
        }

        $scope.update = function() {

            $scope.company.skills = $(".js-example-tokenizer").val();
            console.log($scope.company);
            console.log($(".js-example-tokenizer").val());

            // send fellows info to API via Service
            Companies.update($scope.company, tempID);
        };


    }



})();
