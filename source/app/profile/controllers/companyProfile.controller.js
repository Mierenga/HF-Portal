/**
* CompanyProfileController
* @namespace app.profile.controllers
*/
(function () {
    'use strict';

    angular
    .module('app.profile.controllers')
    .controller('CompanyProfileController', CompanyProfileController);

    CompanyProfileController.$inject = ['$scope', 'Companies', 'User'];

    /**
    * @namespace CompanyProfileController
    */
    function CompanyProfileController($scope, Companies, User) {
        var vm = this;

        var currentUser = User.getCurrentUser();
        Companies.get(currentUser.id).success(function(company){
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

        $scope.update= function(company) {
            // console.log($scope.company);
            //console.log($(".js-example-tokenizer").val());
            //
            //
            //$scope.company.skills = $(".js-example-tokenizer").val();
            //console.log($scope.company);
            //console.log($(".js-example-tokenizer").val());

            // Confirm which tags are already in the database for this company
            //for (var i = 0; i < tags.length; i++) {
            //    console.log(tags[i]);
            //    var currTag = Tags.findOne({
            //        where: {
            //            name: tags[i]
            //        }
            //    });
            //
            //    console.log(currTag.id);
            //
            //}

            // Push any new tags to the database
             
            // send fellows info to API via Service
            Companies.update(company, currentUser.id).success(function(data){

              console.log(data);
            });
        };


    }



})();
