/**
* ProfileController
* @namespace app.profile.controllers
*/
(function () {
  'use strict';

  angular
  .module('app.profile.controllers')
  .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$scope', '$location', 'User'];
  /**
  * @namespace ProfileController
  */
  function ProfileController($scope, $location, User) {

    var vm = this;

    var currentUser = User.getCurrentUser();

    console.log("Profile User");
    console.log(currentUser);

      if( typeof currentUser !== 'undefined') {
          // redirect the user based on their type
          if (currentUser.userType === 'Admin') {
              $location.path("/profile/admin");
          }
          else if (currentUser.userType === 'Fellow') {
              $location.path("/profile/fellow");
          }
          else if (currentUser.userType === 'Company') {
              $location.path("/profile/company");
          }
      }

  }


})();
