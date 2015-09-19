/**
 * FellowsController
 * @namespace app.fellows.controllers
 */
(function () {
  'use strict';

  angular
    .module('app.fellows.controllers')
    .controller('FellowsController', FellowsController);

  FellowsController.$inject = ['$scope', '$modal', 'Fellows'];

  /**
   * @namespace FellowsController
   */
  function FellowsController($scope, $modal, Fellows) {

    activate();

    function activate() {
      //console.log('activated fellows controller!');
    }

    Fellows.all().success(function(fellows){

        $scope.fellows = fellows;
    });

    $scope.openModal = function(fellow) {

      $scope.fellow = fellow;

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

/**
 * Fellows Modal Instance Controller
 * @namespace app.fellows.controllers
 */

  angular
    .module('app.fellows.controllers')
    .controller('FellowsModalInstanceController', FellowsModalInstanceController);

  FellowsModalInstanceController.$inject = ['$scope', '$modalInstance',  'fellow',
	'FellowVotes', 'User', '$timeout'];

  function FellowsModalInstanceController ($scope, $modalInstance, fellow, FellowVotes, User) {

    $scope.fellow = fellow;

    //console.log(fellow);

    $scope.ok = function ok() {
      $modalInstance.close($scope.fellow);
    };

    $scope.cancel = function cancel() {
      $modalInstance.dismiss('cancel');
    };

    $scope.vote = function vote(fellow) {
			console.log("vote");
      var current = User.getCurrentUser();
      if(current.userType === "Company") {
				$scope.loading = true;
        FellowVotes.create(fellow.id, current.id)
					.success( function(vote) {
						console.log("success!");
						//return vote;
					})
				.catch(function (err) {
					console.log(err);
				})
				.finally(function () {
					console.log("finally");
						$scope.loading = false;
						$scope.done = true;
					$timeout(function() {
						$scope.done = false;
					}, 3000);
				});
			}
		};

  }

})();
