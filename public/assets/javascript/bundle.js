/**
 * app.routes
 * @desc    contains the routes for the app
 */

 var app = angular.module('app', ['ngRoute', 'ngCookies',  'ngFileUpload', 'ui.bootstrap',
    'app.config', 'app.home', 'app.companies', 'app.fellows', 'app.profile', 'app.votes' ])
    .run(run);

/**
 *   * @name config
 *     * @desc Define valid application routes
 *       */
 app.config(function($routeProvider, $locationProvider){

    $routeProvider
    .when('/', {
        controller  : 'HomeController',
        templateUrl : 'source/app/home/home.html'
    })
    .when('/fellows', {
        controller: 'FellowsController',
        templateUrl: 'source/app/fellows/fellows.html'
    })
    .when('/fellows/:fellow_id/:fellow_name', {
        controller: 'FellowController',
        templateUrl: 'source/app/fellows/fellow.html'
    })
    .when('/companies', {
        controller: 'CompaniesController',
        templateUrl: 'source/app/companies/companies.html'
    })
    .when('/companies/:company_id/:company_name', {
        controller: 'CompanyController',
        templateUrl: 'source/app/companies/company.html'
    })

    .when('/profile', {
        controller: 'ProfileController',
        templateUrl: 'source/app/profile/profile.html'
    })

    .when('/profile/admin', {
        controller: 'AdminProfileController',
        templateUrl: 'source/app/profile/partials/admin-profile.html'
    })

    .when('/profile/fellow', {
        controller: 'FellowsProfileController',
        templateUrl: 'source/app/profile/partials/fellow-profile.html'
    })

    .when('/profile/company', {
        controller: 'CompanyProfileController',
        templateUrl: 'source/app/profile/partials/company-profile.html'
    })

    .when( '/votes', {
        controller: 'VotesController',
        templateUrl: 'source/app/votes/partials/votes.html'
    })

    .otherwise({ redirectTo: '/' });

});

app.controller('RoutingController', RoutingController)
.controller('LoginModalInstanceController', LoginModalInstanceController);

RoutingController.$inject = ['$scope', '$modal', '$window', 'User', '$location', '$anchorScroll'];
LoginModalInstanceController.$inject = ['$scope', '$window', '$modalInstance', 'User'];

function RoutingController($scope, $modal, $window, User, $location, $anchorScroll) {

    $scope.isUserLoggedIn = false;
    updateLoginStatus();

    $scope.scrollTo = function(id){

        $location.hash(id);
        $anchorScroll();
    };

    function updateLoginStatus(){

        $scope.isUserLoggedIn = User.isUserLoggedIn();
    }

    $scope.openModal = function() {
        var modalInstance = $modal.open({
            templateUrl: 'source/app/profile/partials/login-page.html',
            controller: 'LoginModalInstanceController',
            size: ''
        });

        modalInstance.result.then(function(){
            console.log("Log in complete");
            updateLoginStatus();
        });
    };


    $scope.logoutUser = function(){
        console.log("User Logout");
        User.ClearCredentials();
        $scope.isUserLoggedIn = false;
        $window.location.reload();
    };
}

function LoginModalInstanceController ($scope, $window, $modalInstance, User) {

    // save this through a refesh
    $scope.loginForm = {

        email: "",
        password: "",
        errors: []
    };

    $scope.login = function(loginForm) {

        $scope.loginForm.errors = [];

        console.log(loginForm);
        User.login(loginForm).success(function(user){

            console.log(user);
            //User.currentUser = user
            User.SetCredentials(user.id, user.email, user.userType);
            $window.location.reload();
            $modalInstance.close();

        }).error( function(error){

            $scope.loginForm.errors.push("Invalid user credentials");

        });

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}


run.$inject = ['$cookieStore', 'User'];
function run($cookieStore, User){

    // keep user logged in after page refresh
    var currentUser = $cookieStore.get('globals') || {};
    User.setCurrentUser(currentUser);

    //console.log(currentUser);
    //if ($rootScope.globals.currentUser) {
    //    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    //}

    //$rootScope.$on('$locationChangeStart', function (event, next, current) {
    //    // redirect to login page if not logged in and trying to access a restricted page
    //    var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
    //    var loggedIn = $rootScope.globals.currentUser;
    //    if (restrictedPage && !loggedIn) {
    //        $location.path('/login');
    //    }
    //});
}


/**
 * Helper Functions
 **/

var HFHelpers = HFHelpers || {};

HFHelpers.helpers = {

    slugify: function(str) {
        
        return str.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
};
/**
 * A place to put app wide config stuff
 *
 */
angular.module('app.config', [])
    .constant('CONFIG', {
        'APP_NAME': 'Hacker Fellow Portal',
        'APP_VERSION': '1.0',
        'SERVICE_URL': ''
    });


//var rootUrl = 'https://quiet-cove-6830.herokuapp.com';
// var rootUrl = "https://boiling-springs-7523.herokuapp.com";
/**
 * companies module
 */

(function () {
  'use strict';

  angular
    .module('app.companies', [
        'app.companies.controllers',
        'app.companies.services',
        'app.companies.directives'
        ]);

  //declare the controllers module
  angular
    .module('app.companies.controllers', []);

  //declare the services module
  angular
    .module('app.companies.services', []);

  // declare the directives module
  angular
    .module('app.companies.directives', []);

})();

/**
 * fellows module
 */

(function () {
  'use strict';

  angular
    .module('app.fellows', [
        'app.fellows.controllers',
        'app.fellows.services',
        'app.fellows.directives'
        ]);

  //declare the controllers module
  angular
    .module('app.fellows.controllers', []);

  //declare the services module
  angular
    .module('app.fellows.services', []);

  //declare the directives module
  angular
    .module('app.fellows.directives', []);


})();

/**
 * home module
 */

(function () {
  'use strict';

  angular
    .module('app.home', [
        'app.home.controllers',
        //'app.home.services'
        ]);

  //declare the controllers module
  angular
    .module('app.home.controllers', []);

  //declare the directives module
  angular
    .module('app.home.directives', []);
    //how about this
})();

/**
 * profile module
 */

 (function () {
  'use strict';

      angular
          .module('app.profile', [
              'app.profile.controllers',
              'app.profile.services',
              'app.fellows.services',
              'app.companies.services'
            ]);

      //declare the controllers module
      angular
        .module('app.profile.controllers', []);

     //declare the services module
     angular
         .module('app.profile.services', []);

})();

/**
 * votes module
 */

(function () {
  'use strict';

    angular
        .module('app.votes', [

            'app.votes.controllers',
            'app.votes.services'
        ]);

    //declare the services module
    angular
        .module('app.votes.services', []);


    //declare the controllers module
    angular
        .module('app.votes.controllers', []);



})();

/**
 * CompaniesController
 * @namespace app.companies.controllers
 */
(function () {
    'use strict';

    angular
        .module('app.companies.controllers')
        .controller('CompaniesController', CompaniesController);

    CompaniesController.$inject = ['$scope', '$modal', 'Companies'];

    /**
     * @namespace CompaniesController
     */
    function CompaniesController($scope, $modal, Companies) {

        activate();

        function activate() {
            //console.log('activated companies controller!');
        }

        Companies.all().success(function (companies) {

            $scope.companies = companies;
        });

        $scope.helpers = HFHelpers.helpers;

        $scope.openModal = function (company) {

            $scope.company = company;

            var modalInstance = $modal.open({

                templateUrl: 'source/app/companies/partials/company_detail_view.html',
                controller: 'CompaniesModalInstanceController',
                size: 'lg',
                resolve: {
                    company: function () {
                        return company;
                    }
                }

            });

        };

    }

    /**
     * Companies Modal Instance Controller
     * @namespace app.fellows.controllers
     */

    angular
        .module('app.companies.controllers')
        .controller('CompaniesModalInstanceController', CompaniesModalInstanceController);

    CompaniesModalInstanceController.$inject = ['$scope', '$modalInstance',
        'company', 'Votes', 'User'];

    function CompaniesModalInstanceController($scope, $modalInstance, company, Votes, User) {

        $scope.company = company;

        $scope.ok = function () {
            $modalInstance.close($scope.company);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };


    }

})();

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
        
        $scope.votesFor = [];
        $scope.votesCast = [];
        $scope.currentUser = User.getCurrentUser();

        Companies.get( $routeParams.company_id ).success(function (company) {

            $scope.company = company;

            User.getVotes( company.user_id ).success( function( votes ){

                $scope.votesFor = votes.votesFor;
                $scope.votesCast = votes.votesCast;
            });
        });

        $scope.currentUserVoted = function currentUserVoted(){

            for( var i = 0; i < $scope.votesFor.length; i++ ){

                var element = $scope.votesFor[i];
                if( element.id == $scope.currentUser.id ) return true;
            }
            return false;
        };

        $scope.isFellow = function(){

            return ( $scope.currentUser.userType === "Fellow");
        };

        $scope.vote = function vote(company) {


            if( $scope.isFellow() ) {

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

(function() {
    'use strict';

    angular
        .module('app.companies.directives')
        .directive('companyCard', companyCard);


    function companyCard() {
        return {
            restrict: 'AE',
            replace: true,
            scope: true,
            templateUrl: '/source/app/companies/partials/company_card.html'/*,
            link: function(scope, elem, attrs) {
                elem.bind('click', function() {
                });
            }*/
        };
    }

})();
/**
* Companies
* @namespace app.companies.services
*/
(function () {
  'use strict';

  angular
    .module('app.companies.services')
    .service('Companies', Companies);

  Companies.$inject = ['$http', 'Upload', 'CONFIG'];

  /**
  * @namespace Companies
  */
  function Companies($http, Upload, CONFIG) {

    var rootUrl = CONFIG.SERVICE_URL;

    return {
      all: all,
      get: get,
      getByUserId: getByUserId,
      create: create,
      update: update,
      destroy: destroy
    };

    ////////////////////

    /**
     * @name all
     * @desc get all the companies
     */
    function all() {
      return $http.get(rootUrl + '/api/v1/companies/');
    }

    /**
     * @name get
     * @desc get just one company
     */
    function get(id) {
      return $http.get(rootUrl + '/api/v1/companies/' + parseInt(id) );
    }

    /**
    * @name getByUserId
    * @desc get just one company by user id
    */
    function getByUserId(user_id) {
      return $http.get(rootUrl + '/api/v1/companies/user_id/' + parseInt(user_id) );
    }


    /**
     * @name create
     * @desc creeate a new company record
     */
    function create(company) {
      return $http.post(rootUrl + '/api/v1/companies/', company);
    }

    /**
     * @name update
     * @desc updates a company record
     */
    function update(company) {

      return Upload.upload({
        url: rootUrl + '/api/v1/companies/' + company.id,
        fields: company,
        file: company.file,
        method: 'PUT'

      });

      //return $http.put(rootUrl + '/api/v1/companies/' + id, company);
    }

    /**
     * @name destroy
     * @desc destroy a company record
     */
    function destroy(id) {
      return $http.delete(rootUrl + '/api/v1/companies/' + id);
    }
  }
})();

/**
 * FellowsController
 * @namespace app.fellows.controllers
 */
(function () {
    'use strict';

    angular
        .module('app.fellows.controllers')
        .controller('FellowController', FellowController);

    FellowController.$inject = ['$routeParams', '$scope', '$timeout', 'Fellows', 'User'];

    /**
     * @namespace FellowsController
     */
    function FellowController($routeParams, $scope, $timeout, Fellows, User) {

        activate();

        function activate() {
            //console.log('activated fellows controller!');
        }

        $scope.votesFor = [];
        $scope.votesCast = [];
        $scope.currentUser = User.getCurrentUser();

        Fellows.get( $routeParams.fellow_id ).success(function (fellow) {

            $scope.fellow = fellow;

            User.getVotes( fellow.user_id ).success( function( votes ){

                $scope.votesFor = votes.votesFor;
                $scope.votesCast = votes.votesCast;
            });
        });

        $scope.currentUserVoted = function currentUserVoted(){

            for( var i = 0; i < $scope.votesFor.length; i++ ){

                var element = $scope.votesFor[i];
                if( element.id == $scope.currentUser.id ) return true;
            }
            return false;
        };

        $scope.isCompany = function(){

            return ( $scope.currentUser.userType === "Company" );
        };

        $scope.vote = function vote(fellow) {

            if ( $scope.isCompany() ) {

                $scope.loading = true;

                Votes.create(current.id, fellow.user_id)
                    .success(function (vote) {

                        console.log("success: "+vote);
                        return vote;
                    })
                    .catch(function (err) {

                        console.log("Error: "+err);
                    })
                    .finally(function () {

                        $scope.loading = false;
                        $scope.done = true;

                        $timeout(function () {

                            $scope.done = false;

                        }, 3000);

                    });
            }
        };

    }


})();

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

        $scope.helpers = HFHelpers.helpers;

        Fellows.all().success(function (fellows) {

            $scope.fellows = fellows;
        });

        $scope.openModal = function (fellow) {

            $scope.fellow = fellow;

            var modalInstance = $modal.open({

                templateUrl: 'source/app/fellows/partials/fellow_detail_view.html',
                controller: 'FellowsModalInstanceController',
                size: 'lg',
                resolve: {
                    fellow: function () {
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

    FellowsModalInstanceController.$inject = ['$scope', '$modalInstance', 'fellow',
        'Votes', 'User', '$timeout'];

    function FellowsModalInstanceController($scope, $modalInstance, fellow, Votes, User) {

        $scope.fellow = fellow;

        //console.log(fellow);

        $scope.ok = function ok() {
            $modalInstance.close($scope.fellow);
        };

        $scope.cancel = function cancel() {
            $modalInstance.dismiss('cancel');
        };

    }

})();

(function() {
  'use strict';

  angular
    .module('app.fellows.directives')
    .directive('fellowCard', fellowCard);

  //ng-fellow-card
 function fellowCard() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: '/source/app/fellows/partials/fellow_card.html'/*,
       link: function(scope, elem, attrs) {
        elem.bind('click', function() {
        });
       } */
    };
  }
})();

/**
* Fellows
* @namespace app.fellows.services
*/
(function () {
  'use strict';

  angular
	.module('app.fellows.services')
	.service('Fellows', Fellows);

  Fellows.$inject = ['$http', 'Upload', 'CONFIG'];



  /**
  * @namespace Fellows
  * @returns {Service}
  */
  function Fellows($http, Upload, CONFIG) {


	  var rootUrl = CONFIG.SERVICE_URL;

	return {
	  all: all,
	  get: get,
      getByUserId: getByUserId,
	  create: create,
	  update: update,
	  destroy: destroy
	};

	////////////////////

	/**
	 * @name all
	 * @desc get all the fellows
	 */
	function all() {

		return $http.get(rootUrl + '/api/v1/fellows');
	}

	/**
	 * @name get
	 * @desc get one fellow
	 */
	function get(id) {

		return $http.get(rootUrl + '/api/v1/fellows/' + id);
	}

	/**
	* @name getByUserId
	* @desc get one fellow by user_id
	*/
	function getByUserId(user_id) {

	  return $http.get(rootUrl + '/api/v1/fellows/user_id/' + user_id);
	}


	/**
	 * @name create
	 * @desc creeate a new fellow record
	 */
	function create(fellow) {
		return $http.post(rootUrl + '/api/v1/fellows/', fellow);
	}

	/**
	 * @name update
	 * @desc updates a fellow record
	 */
	function update(fellow) {

        return Upload.upload({
            url: rootUrl + '/api/v1/fellows/' + fellow.id,
            fields: fellow,
            file: fellow.file,
            method: 'PUT'

        });

		//return $http.put(rootUrl + '/api/v1/fellows/' + fellow.id, fellow);
	}

	/**
	 * @name destroy
	 * @desc destroy a fellow record
	 */
	function destroy(id) {
	  return $http.delete(rootUrl + '/api/v1/fellows/' + id);
	}
  }

})();

/**
* HomeController
* @namespace app.home.controllers
*/
(function () {
  'use strict';

  angular
    .module('app.home.controllers')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'Fellows'];

  /**
  * @namespace HomeController
  */
  function HomeController($scope, Fellows) {

    var vm = this;

    Fellows.all().success(function(fellows){

      $scope.fellows = fellows;
    });

    activate();

    function activate() {
      //console.log('activated home controller!');
      //Home.all();
    }
  }
})();

/**
* AdminProfileController
* @namespace app.profile.controllers
*/
(function () {
    'use strict';


    angular
    .module('app.profile.controllers')
    .controller('AdminProfileController', AdminProfileController);
    //.controller('AdminProfileModalInstanceController', AdminProfileModalInstanceController);

    AdminProfileController.$inject = ['$scope', '$location', 'User', 'Fellows', 'Companies'];

    /**
     * @namespace AdminProfileController
     */
     function AdminProfileController($scope, $location, User, Fellows, Companies) {

        // Probably can handle this in the routes or with middleware or some kind
        if( !User.isUserLoggedIn() ) {

            $location.path("/");
            return;
        }

        // Make sure current user is an Admin
        var currentUser = User.getCurrentUser();
        if( currentUser.userType !== "Admin" ){

            $location.path("/profile");
            return;
        }

        //$scope.openModal = function() {
        //
        //    var modalInstance = $modal.open({
        //
        //        templateUrl: 'source/app/profile/partials/admin-create-user.html',
        //        controller: 'AdminProfileModalInstanceController',
        //        size: 'lg'
        //        //resolve: {
        //        //    function(){
        //        //
        //        //    }
        //        //}
        //
        //    });
        //};

        function unHighlightField(){

            jQuery("input").removeClass("error");
            jQuery("#userType").removeClass('error');
        }

        function highlightPasswordField(){

            jQuery("#password").addClass('error');
        }

        function highlightEmailField(){

            jQuery("email").addClass('error');
        }

        function highlightUserTypeField(){

            jQuery("userType").addClass('error');
        }

        // Admin profile tabs
        $scope.tabs = [
            {
                title:'User List',
                template:'source/app/profile/partials/admin/user-list.html'
            },
            {
                title:'New User',
                template:'source/app/profile/partials/admin/new-user-form.html'
            },
            {
                title:'Votes',
                template:'source/app/profile/partials/admin/admin-votes.html'
            }
        ];


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
                    //highlight button
                    highlightUserTypeField();
                    errors = true;
                }
            }

            if( !errors ){

                // send user to API via Service
                User.create(user).then(function(response) {

                    console.log(response);

                    var user_id = response.data.id;

                    if( user.userType === "Fellow" ){

                        var fellow_post = {

                            user_id: user_id
                        };
                        Fellows.create(fellow_post);
                    }
                    else if( user.userType === "Company" ){

                        var company_post = {

                            user_id: user_id
                        };
                        Companies.create(company_post);
                    }

                });

                //$modalInstance.close();
            }

        };

        //$scope.cancel = function () {
        //    $modalInstance.dismiss('cancel');
        //};

        $scope.switchType = function(user){

            console.log(user);

            if( user.userType === "Company" ){

                jQuery("optionCompany").addClass('selected');
                jQuery("optionFellow").removeClass('selected');
            }
            else if( user.userType === "Fellow" ){

                console.log("Fellow selection");

                jQuery("optionCompany").removeClass('selected');
                jQuery("optionFellow").addClass('selected');
            }

        };
    }


    //function AdminProfileModalInstanceController ($scope, $modalInstance, User, Fellows, Companies) {
    //
    //    function unHighlightField(){
    //
    //        jQuery("input").removeClass("error");
    //        jQuery("#userType").removeClass('error');
    //    }
    //
    //    function highlightPasswordField(){
    //
    //        jQuery("#password").addClass('error');
    //    }
    //
    //    function highlightEmailField(){
    //
    //        jQuery("email").addClass('error');
    //    }
    //
    //    function highlightUserTypeField(){
    //
    //        jQuery("userType").addClass('error');
    //    }
    //
    //    $scope.user = {
    //        email: "",
    //        password: "",
    //        userType: ""
    //    };
    //
    //    $scope.ok = function (user) {
    //
    //        /**********DEBUG START*********/
    //        user.userType = "Fellow"
    //        /**********DEBUG END*********/
    //        // remove previous highlights in case data is now correct
    //        unHighlightField();
    //
    //        console.log("User Output");
    //        console.log(user);
    //
    //        // if everything is good log data and close, else highlight error
    //        var errors = false;
    //        if(typeof(user) == "undefined"){
    //            console.log("No info");
    //            //heighlight all
    //            highlightEmailField();
    //            highlightPasswordField();
    //            highlightUserTypeField();
    //            errors = true;
    //        }
    //        else {
    //
    //            if(typeof(user.email) == "undefined"){
    //                console.log("Bad email");
    //                //heighlight email
    //                highlightEmailField();
    //                errors = true;
    //            }
    //
    //            if(typeof(user.password) == "undefined"){
    //                console.log("Bad password");
    //                //heighlight password
    //                highlightPasswordField();
    //                errors = true;
    //            }
    //
    //            if(typeof(user.userType) == "undefined"){
    //                console.log("Bad type");
    //                //highlight button
    //                highlightUserTypeField();
    //                errors = true;
    //            }
    //        }
    //
    //        if( !errors ){
    //
    //            // send user to API via Service
    //            User.create(user).then(function(response) {
    //
    //                console.log(response);
    //
    //                var user_id = response.data.id;
    //
    //                if( user.userType === "Fellow" ){
    //
    //                    var fellow_post = {
    //
    //                        user_id: user_id
    //                    };
    //                    Fellows.create(fellow_post);
    //                }
    //                else if( user.userType === "Company" ){
    //
    //                    var company_post = {
    //
    //                        user_id: user_id
    //                    };
    //                    Companies.create(company_post);
    //                }
    //                //console.log(user);
    //            });
    //
    //            $modalInstance.close();
    //        }
    //
    //    };
    //
    //    $scope.cancel = function () {
    //        $modalInstance.dismiss('cancel');
    //    };
    //
    //    $scope.switchType = function(user, $event){
    //
    //        console.log(user);
    //
    //        if( user.userType === "Company" ){
    //
    //            jQuery("optionCompany").addClass('selected');
    //            jQuery("optionFellow").removeClass('selected');
    //        }
    //        else if( user.userType === "Fellow" ){
    //
    //            console.log("Fellow selection");
    //
    //            jQuery("optionCompany").removeClass('selected');
    //            jQuery("optionFellow").addClass('selected');
    //        }
    //
    //    };
    //}

})();

/**
* CompanyProfileController
* @namespace app.profile.controllers
*/
(function () {
    'use strict';

    angular
    .module('app.profile.controllers')
    .controller('CompanyProfileController', CompanyProfileController);

    CompanyProfileController.$inject = ['$scope', '$location', 'Companies', 'User', 'Tags'];

    /**
    * @namespace CompanyProfileController
    */
    function CompanyProfileController($scope, $location, Companies, User, Tags) {
        var vm = this;

        // Probably can handle this in the routes or with middleware of some kind
        if( !User.isUserLoggedIn() ) {

            $location.path("/");
            return;
        }

        // Make sure current user is a Company
        var currentUser = User.getCurrentUser();
        if( currentUser.userType !== "Company" ){

            $location.path("/profile");
            return;
        }

        Companies.getByUserId(currentUser.id).success(function(company){

            $scope.company = company;

            Tags.all().success(function(tags){

                var data = [];
                tags.forEach(function(tag){

                    var item = {

                        id: tag.id,
                        text: tag.name
                    };
                    data.push(item);
                });

                $("select#tags").select2({
                    //tags: true,
                    data: data,
                    tokenSeparators: [',',' ']
                });

            });

        });

        activate();

        function activate() {

            //console.log('activated profile controller!');
            //Profile.all();
        }

        $scope.update= function(company) {

            // get the tags from the form
            company.tags = $("#tags").val();

            // send companies info to API via Service
            Companies.update(company).success(function(newCompanyData){

                // ** Trigger Success message here
                company = newCompanyData;

                // hide update message
                $("#profile-photo").find(".upload-status").hide();
            });
        };


    }



})();

/**
* FellowsProfileController
* @namespace app.profile.controllers
*/
(function () {
    'use strict';

    angular
    .module('app.profile.controllers')
    .controller('FellowsProfileController', FellowsProfileController);

    FellowsProfileController.$inject = ['$scope', '$location', 'Fellows', 'Tags', 'User' ];

    /**
    * @namespace FellowsProfileController
    */
    function FellowsProfileController($scope, $location, Fellows, Tags, User ) {
        var vm = this;

        // Probably can handle this in the routes or with middleware of some kind
        if( !User.isUserLoggedIn() ) {

            $location.path("/");
            return;
        }

        // Make sure current user is a Fellow
        var currentUser = User.getCurrentUser();
        if( currentUser.userType !== "Fellow" ){

            $location.path("/profile");
            return;
        }

        Fellows.getByUserId(currentUser.id).success(function(fellow){

            $scope.fellow = fellow;

            Tags.all().success(function(tags){

                var data = [];
                tags.forEach(function(tag){

                    var item = {

                        id: tag.id,
                        text: tag.name
                    };
                    data.push(item);
                });

                // https://github.com/angular-ui/ui-select2/blob/master/demo/app.js

                $("select#tags").select2({
                    //tags: true,
                    data: data,
                    tokenSeparators: [',',' ']
                });

            });

        });

        activate();

        function activate() {
            //console.log('activated profile controller!');
            //Profile.all();
        }

        $scope.update = function(fellow, file) {

            fellow.tags = $("#tags").val();

            // send fellows info to API via Service
            Fellows.update(fellow).success(function(newFellowData){

                // ** Trigger Success message here
                fellow = newFellowData;

                // hide update message
                $("#profile-photo").find(".upload-status").hide();
            });
        };

    }

})();

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

      if( User.isUserLoggedIn() ) {

          var currentUser = User.getCurrentUser();

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
      else{

           $location.path("/");
      }

  }


})();

/**
 * Fellows
 * @namespace app.services
 */
(function () {
    'use strict';

    angular
        .module('app.profile.services')
        .service('Tags', Tags);

    Tags.$inject = ['$http', 'CONFIG'];

    /**
     * @namespace Tags
     * @returns {Service}
     */
    function Tags($http, CONFIG) {

        var rootUrl = CONFIG.SERVICE_URL;

        return {
            all: all,
            get: get,
            //create: create,
            //update: update,
            //destroy: destroy
        };

        ////////////////////

        /**
         * @name all
         * @desc get all the fellows
         */
        function all() {

            return $http.get(rootUrl + '/api/v1/tags');
        }

        /**
         * @name get
         * @desc get one fellow
         * @desc get one fellow
         */
        function get(id) {

            return $http.get(rootUrl + '/api/v1/tags/' + id);

        }

        /**
         * @name create
         * @desc creeate a new fellow record
         */
        //function create(fellow) {
        //    return $http.post(rootUrl + '/api/v1/fellows/', fellow);
        //}

        /**
         * @name update
         * @desc updates a fellow record
         */
        //function update(fellow, id) {
        //    return $http.put(rootUrl + '/api/v1/fellows/' + id, fellow);
        //}

        /**
         * @name destroy
         * @desc destroy a fellow record
         */
        //function destroy(id) {
        //    return $http.delete(rootUrl + '/api/v1/fellows/' + id);
        //}
    }

})();

/**
 * Profile
 * @namespace app.profile.services
 */
(function () {
  'use strict';

  angular
    .module('app.profile.services')
    .factory('User', User);

  User.$inject = ['$rootScope', '$cookieStore', '$http', 'CONFIG'];

  /**
   * @namespace User
   * @returns {Service}
   */
  function User($rootScope, $cookieStore, $http, CONFIG) {

      var rootUrl = CONFIG.SERVICE_URL;

      // Will hold info for the currently logged in user
      var currentUser = {};

      function getCurrentUser() {

          return currentUser;
      }

      function setCurrentUser(user) {

          currentUser = user;
      }

      function getVotes( user_id ){

          return $http.get(rootUrl + '/api/v1/users/' + user_id + '/votes' );
      }


      /**
       * @name login
       * @desc login a new user record
       */
      function login(user) {
          return $http.post(rootUrl + '/api/v1/users/login', user);
      }

      return {

          //all: all,
          //get: get,
          getVotes: getVotes,
          create: create,
          login: login,
          //update: update,
          //destroy: destroy
          SetCredentials: SetCredentials,
          ClearCredentials: ClearCredentials,
          getCurrentUser: getCurrentUser,
          setCurrentUser: setCurrentUser,
          isUserLoggedIn: isUserLoggedIn
      };


      /**
       * @name all
       * @desc get all the companies
       */
      //function all() {
      //
      //    return [];
      //
      //    //return $http.get(rootUrl + '/api/v1/companies/');
      //}

      /**
       * @name get
       * @desc get just one company
       */
      //function get(id) {
      //    return $http.get(rootUrl + '/api/v1/users/' + parseInt(id) );
      //}

      /**
       * @name create
       * @desc create a new fellow record
       */
      function create(user) {
          return $http.post(rootUrl + '/api/v1/users/create', user);
      }

      /**
       * @name destroy
       * @desc destroy a user record
       */
      //function destroy(id) {
      //    return $http.delete(rootUrl + rootUrl + '/api/v1/users/' + id);
      //}

      function isUserLoggedIn(){

          //console.log(currentUser);
          if( Object.keys(currentUser).length > 0 ){

              return true;
          }
          else{

              return false;
          }
      }

      function SetCredentials(id, username, userType) {

          var authdata = Base64.encode(id + ':' + username + ':' + userType);

          currentUser = {
              id: id,
              username: username,
              userType: userType,
              authdata: authdata
          };

          $cookieStore.put('globals', currentUser);
      }

      function ClearCredentials() {

          $rootScope.globals = {};
          $cookieStore.remove('globals');
      }

  }

  // Base64 encoding service used by AuthenticationService
  var Base64 = {

    keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    encode: function (input) {
      var output = "";
      var chr1, chr2, chr3 = "";
      var enc1, enc2, enc3, enc4 = "";
      var i = 0;

      do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }

        output = output +
          this.keyStr.charAt(enc1) +
          this.keyStr.charAt(enc2) +
          this.keyStr.charAt(enc3) +
          this.keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
      } while (i < input.length);

      return output;
    },

    decode: function (input) {
      var output = "";
      var chr1, chr2, chr3 = "";
      var enc1, enc2, enc3, enc4 = "";
      var i = 0;

      // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
      var base64test = /[^A-Za-z0-9\+\/\=]/g;
      if (base64test.exec(input)) {
        window.alert("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      do {
        enc1 = this.keyStr.indexOf(input.charAt(i++));
        enc2 = this.keyStr.indexOf(input.charAt(i++));
        enc3 = this.keyStr.indexOf(input.charAt(i++));
        enc4 = this.keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

      } while (i < input.length);

      return output;
    }
  };

})();

/**
 * VotesController
 * @namespace app.votes.controllers
 */
(function () {
    'use strict';

    angular
        .module( 'app.votes.controllers' )
        .controller( 'VotesController', VotesController );

    VotesController.$inject = [ '$scope', '$location', 'User', 'Votes' ];
    /**
     * @namespace VoteController
     */
    function VotesController($scope, $location, User, Votes) {

        var vm = this;

        if( User.isUserLoggedIn() ) {

            var currentUser = User.getCurrentUser();

            // Get the companies voted on by the current logged in user
            CompanyVotes.get( currentUser.id )
                        .success( function( votes ){

                             console.log( votes );
                             $scope.company_votes = votes;
                        });

            FellowVotes.get( currentUser.id )
                        .success( function( votes ){

                            console.log( votes );
                            $scope.fellow_votes = votes;
                        });


        }
        else{

            $location.path("/");
        }



    }


})();

/**
 * Votes
 * @namespace app.votes.services
 */
(function () {
    'use strict';

    angular
        .module('app.votes.services')
        .service('Votes', Votes);

    Votes.$inject = ['$http', 'CONFIG'];


    /**
     * @namespace CompanyVotes
     */
    function Votes($http, CONFIG) {

        var rootUrl = CONFIG.SERVICE_URL;

        return {

            getVotesFor: getVotesFor,
            getVotesCast: getVotesCast,
            create: create,
            destroy: destroy
        };

        /**
         * @name get votes
         * @desc get the votes cast for a user
         */
        function getVotesFor(user_id) {

            return $http.get(rootUrl + '/api/v1/votes/for/' + user_id);
        }

        /**
         * @name get votes
         * @desc get the votes cast by a user
         */
        function getVotesCast(user_id) {

            return $http.get(rootUrl + '/api/v1/votes/by/' + user_id);
        }

        /**
         * @name create
         * @desc cast a vote for a user
         */
        function create( voter_id, votee_id ) {

            console.log( voter_id + " " + votee_id );

            return $http.post(rootUrl + '/api/v1/votes/', {

                voter_id: voter_id,
                votee_id: votee_id
            });
        }

        /**
         * @name destroy
         * @desc destroy a vote record
         */
        function destroy(id) {

            return $http.delete(rootUrl + '/api/v1/votes/' + id);
        }
    }


})();


/*! 7.3.4 */
!window.XMLHttpRequest||window.FileAPI&&FileAPI.shouldLoad||(window.XMLHttpRequest.prototype.setRequestHeader=function(a){return function(b,c){if("__setXHR_"===b){var d=c(this);d instanceof Function&&d(this)}else a.apply(this,arguments)}}(window.XMLHttpRequest.prototype.setRequestHeader));var ngFileUpload=angular.module("ngFileUpload",[]);ngFileUpload.version="7.3.4",ngFileUpload.service("UploadBase",["$http","$q","$timeout",function(a,b,c){function d(d){function g(a){j.notify&&j.notify(a),k.progressFunc&&c(function(){k.progressFunc(a)})}function h(a){return null!=d._start&&f?{loaded:a.loaded+d._start,total:d._file.size,type:a.type,config:d,lengthComputable:!0,target:a.target}:a}function i(){a(d).then(function(a){d._chunkSize&&!d._finished?(g({loaded:d._end,total:d._file.size,config:d,type:"progress"}),e.upload(d)):(d._finished&&delete d._finished,j.resolve(a))},function(a){j.reject(a)},function(a){j.notify(a)})}d.method=d.method||"POST",d.headers=d.headers||{};var j=d._deferred=d._deferred||b.defer(),k=j.promise;return d.headers.__setXHR_=function(){return function(a){a&&(d.__XHR=a,d.xhrFn&&d.xhrFn(a),a.upload.addEventListener("progress",function(a){a.config=d,g(h(a))},!1),a.upload.addEventListener("load",function(a){a.lengthComputable&&(a.config=d,g(h(a)))},!1))}},f?d._chunkSize&&d._end&&!d._finished?(d._start=d._end,d._end+=d._chunkSize,i()):d.resumeSizeUrl?a.get(d.resumeSizeUrl).then(function(a){d._start=d.resumeSizeResponseReader?d.resumeSizeResponseReader(a.data):parseInt((null==a.data.size?a.data:a.data.size).toString()),d._chunkSize&&(d._end=d._start+d._chunkSize),i()},function(a){throw a}):d.resumeSize?d.resumeSize().then(function(a){d._start=a,i()},function(a){throw a}):i():i(),k.success=function(a){return k.then(function(b){a(b.data,b.status,b.headers,d)}),k},k.error=function(a){return k.then(null,function(b){a(b.data,b.status,b.headers,d)}),k},k.progress=function(a){return k.progressFunc=a,k.then(null,null,function(b){a(b)}),k},k.abort=k.pause=function(){return d.__XHR&&c(function(){d.__XHR.abort()}),k},k.xhr=function(a){return d.xhrFn=function(b){return function(){b&&b.apply(k,arguments),a.apply(k,arguments)}}(d.xhrFn),k},k}var e=this,f=window.Blob&&(new Blob).slice;this.upload=function(a){function b(c,d,e){if(void 0!==d)if(angular.isDate(d)&&(d=d.toISOString()),angular.isString(d))c.append(e,d);else if("form"===a.sendFieldsAs)if(angular.isObject(d))for(var f in d)d.hasOwnProperty(f)&&b(c,d[f],e+"["+f+"]");else c.append(e,d);else d=angular.isString(d)?d:angular.toJson(d),"json-blob"===a.sendFieldsAs?c.append(e,new Blob([d],{type:"application/json"})):c.append(e,d)}function c(a){return a instanceof Blob||a.flashId&&a.name&&a.size}function g(b,d,e){if(c(d)){if(a._file=a._file||d,null!=a._start&&f){a._end&&a._end>=d.size&&(a._finished=!0,a._end=d.size);var h=d.slice(a._start,a._end||d.size);h.name=d.name,d=h,a._chunkSize&&(b.append("chunkSize",a._end-a._start),b.append("chunkNumber",Math.floor(a._start/a._chunkSize)),b.append("totalSize",a._file.size))}b.append(e,d,d.fileName||d.name)}else{if(!angular.isObject(d))throw"Expected file object in Upload.upload file option: "+d.toString();for(var i in d)if(d.hasOwnProperty(i)){var j=i.split(",");j[1]&&(d[i].fileName=j[1].replace(/^\s+|\s+$/g,"")),g(b,d[i],j[0])}}}return a._chunkSize=e.translateScalars(a.resumeChunkSize),a._chunkSize=a._chunkSize?parseInt(a._chunkSize.toString()):null,a.headers=a.headers||{},a.headers["Content-Type"]=void 0,a.transformRequest=a.transformRequest?angular.isArray(a.transformRequest)?a.transformRequest:[a.transformRequest]:[],a.transformRequest.push(function(c){var d,e=new FormData,f={};for(d in a.fields)a.fields.hasOwnProperty(d)&&(f[d]=a.fields[d]);c&&(f.data=c);for(d in f)if(f.hasOwnProperty(d)){var h=f[d];a.formDataAppender?a.formDataAppender(e,d,h):b(e,h,d)}if(null!=a.file)if(angular.isArray(a.file))for(var i=0;i<a.file.length;i++)g(e,a.file[i],"file");else g(e,a.file,"file");return e}),d(a)},this.http=function(b){return b.transformRequest=b.transformRequest||function(b){return window.ArrayBuffer&&b instanceof window.ArrayBuffer||b instanceof Blob?b:a.defaults.transformRequest[0].apply(this,arguments)},b._chunkSize=e.translateScalars(b.resumeChunkSize),b._chunkSize=b._chunkSize?parseInt(b._chunkSize.toString()):null,d(b)},this.translateScalars=function(a){if(angular.isString(a)){if(a.search(/kb/i)===a.length-2)return parseFloat(1e3*a.substring(0,a.length-2));if(a.search(/mb/i)===a.length-2)return parseFloat(1e6*a.substring(0,a.length-2));if(a.search(/gb/i)===a.length-2)return parseFloat(1e9*a.substring(0,a.length-2));if(a.search(/b/i)===a.length-1)return parseFloat(a.substring(0,a.length-1));if(a.search(/s/i)===a.length-1)return parseFloat(a.substring(0,a.length-1));if(a.search(/m/i)===a.length-1)return parseFloat(60*a.substring(0,a.length-1));if(a.search(/h/i)===a.length-1)return parseFloat(3600*a.substring(0,a.length-1))}return a},this.setDefaults=function(a){this.defaults=a||{}},this.defaults={},this.version=ngFileUpload.version}]),ngFileUpload.service("Upload",["$parse","$timeout","$compile","UploadResize",function(a,b,c,d){var e=d;return e.getAttrWithDefaults=function(a,b){return null!=a[b]?a[b]:null==e.defaults[b]?e.defaults[b]:e.defaults[b].toString()},e.attrGetter=function(b,c,d,e){if(!d)return this.getAttrWithDefaults(c,b);try{return e?a(this.getAttrWithDefaults(c,b))(d,e):a(this.getAttrWithDefaults(c,b))(d)}catch(f){if(b.search(/min|max|pattern/i))return this.getAttrWithDefaults(c,b);throw f}},e.updateModel=function(c,d,f,g,h,i,j){function k(){var j=h&&h.length?h[0]:null;if(c){var k=!e.attrGetter("ngfMultiple",d,f)&&!e.attrGetter("multiple",d)&&!o;a(e.attrGetter("ngModel",d)).assign(f,k?j:h)}var l=e.attrGetter("ngfModel",d);l&&a(l).assign(f,h),g&&a(g)(f,{$files:h,$file:j,$newFiles:m,$duplicateFiles:n,$event:i}),b(function(){})}function l(a,b){var c=e.attrGetter("ngfResize",d,f);if(!c||!e.isResizeSupported())return b();for(var g=a.length,h=function(){g--,0===g&&b()},i=function(b){return function(c){a.splice(b,1,c),h()}},j=function(a){return function(b){h(),a.$error="resize",a.$errorParam=(b?(b.message?b.message:b)+": ":"")+(a&&a.name)}},k=0;k<a.length;k++){var l=a[k];l.$error||0!==l.type.indexOf("image")?h():e.resize(l,c.width,c.height,c.quality).then(i(k),j(l))}}var m=h,n=[],o=e.attrGetter("ngfKeep",d,f);if(o===!0){if(!h||!h.length)return;var p=(c&&c.$modelValue||d.$$ngfPrevFiles||[]).slice(0),q=!1;if(e.attrGetter("ngfKeepDistinct",d,f)===!0){for(var r=p.length,s=0;s<h.length;s++){for(var t=0;r>t;t++)if(h[s].name===p[t].name){n.push(h[s]);break}t===r&&(p.push(h[s]),q=!0)}if(!q)return;h=p}else h=p.concat(h)}d.$$ngfPrevFiles=h,j?k():e.validate(h,c,d,f,e.attrGetter("ngfValidateLater",d),function(){l(h,function(){b(function(){k()})})})},e}]),ngFileUpload.directive("ngfSelect",["$parse","$timeout","$compile","Upload",function(a,b,c,d){function e(a){var b=a.match(/Android[^\d]*(\d+)\.(\d+)/);if(b&&b.length>2){var c=d.defaults.androidFixMinorVersion||4;return parseInt(b[1])<4||parseInt(b[1])===c&&parseInt(b[2])<c}return-1===a.indexOf("Chrome")&&/.*Windows.*Safari.*/.test(a)}function f(a,b,c,d,f,h,i,j){function k(){return"input"===b[0].tagName.toLowerCase()&&c.type&&"file"===c.type.toLowerCase()}function l(){return t("ngfChange")||t("ngfSelect")}function m(b){for(var e=b.__files_||b.target&&b.target.files,f=[],g=0;g<e.length;g++)f.push(e[g]);j.updateModel(d,c,a,l(),f.length?f:null,b)}function n(a){if(b!==a)for(var c=0;c<b[0].attributes.length;c++){var d=b[0].attributes[c];"type"!==d.name&&"class"!==d.name&&"id"!==d.name&&"style"!==d.name&&((null==d.value||""===d.value)&&("required"===d.name&&(d.value="required"),"multiple"===d.name&&(d.value="multiple")),a.attr(d.name,d.value))}}function o(){if(k())return b;var a=angular.element('<input type="file">');return n(a),a.css("visibility","hidden").css("position","absolute").css("overflow","hidden").css("width","0px").css("height","0px").css("border","none").css("margin","0px").css("padding","0px").attr("tabindex","-1"),g.push({el:b,ref:a}),document.body.appendChild(a[0]),a}function p(c){if(b.attr("disabled")||t("ngfSelectDisabled",a))return!1;var d=q(c);return null!=d?d:(r(c),e(navigator.userAgent)?setTimeout(function(){w[0].click()},0):w[0].click(),!1)}function q(a){var b=a.changedTouches||a.originalEvent&&a.originalEvent.changedTouches;if("touchstart"===a.type)return v=b?b[0].clientY:0,!0;if(a.stopPropagation(),a.preventDefault(),"touchend"===a.type){var c=b?b[0].clientY:0;if(Math.abs(c-v)>20)return!1}}function r(b){w.val()&&(w.val(null),j.updateModel(d,c,a,l(),null,b,!0))}function s(a){if(w&&!w.attr("__ngf_ie10_Fix_")){if(!w[0].parentNode)return void(w=null);a.preventDefault(),a.stopPropagation(),w.unbind("click");var b=w.clone();return w.replaceWith(b),w=b,w.attr("__ngf_ie10_Fix_","true"),w.bind("change",m),w.bind("click",s),w[0].click(),!1}w.removeAttr("__ngf_ie10_Fix_")}var t=function(a,b){return j.attrGetter(a,c,b)},u=[];u.push(a.$watch(t("ngfMultiple"),function(){w.attr("multiple",t("ngfMultiple",a))})),u.push(a.$watch(t("ngfCapture"),function(){w.attr("capture",t("ngfCapture",a))})),c.$observe("accept",function(){w.attr("accept",t("accept"))}),u.push(function(){c.$$observers&&delete c.$$observers.accept});var v=0,w=b;k()||(w=o()),w.bind("change",m),k()?b.bind("click",r):b.bind("click touchstart touchend",p),j.registerValidators(d,w,c,a),-1!==navigator.appVersion.indexOf("MSIE 10")&&w.bind("click",s),a.$on("$destroy",function(){k()||w.remove(),angular.forEach(u,function(a){a()})}),h(function(){for(var a=0;a<g.length;a++){var b=g[a];document.body.contains(b.el[0])||(g.splice(a,1),b.ref.remove())}}),window.FileAPI&&window.FileAPI.ngfFixIE&&window.FileAPI.ngfFixIE(b,w,m)}var g=[];return{restrict:"AEC",require:"?ngModel",link:function(e,g,h,i){f(e,g,h,i,a,b,c,d)}}}]),function(){function a(a){return"img"===a.tagName.toLowerCase()?"image":"audio"===a.tagName.toLowerCase()?"audio":"video"===a.tagName.toLowerCase()?"video":/./}function b(b,c,d,e,f,g,h,i){function j(a){var g=b.attrGetter("ngfNoObjectUrl",f,d);b.dataUrl(a,g)["finally"](function(){c(function(){var b=(g?a.dataUrl:a.blobUrl)||a.dataUrl;i?e.css("background-image","url('"+(b||"")+"')"):e.attr("src",b),b?e.removeClass("ngf-hide"):e.addClass("ngf-hide")})})}c(function(){var c=d.$watch(f[g],function(c){var d=h;return"ngfThumbnail"!==g||d||(d={width:e[0].clientWidth,height:e[0].clientHeight}),angular.isString(c)?(e.removeClass("ngf-hide"),i?e.css("background-image","url('"+c+"')"):e.attr("src",c)):void(!c||!c.type||0!==c.type.search(a(e[0]))||i&&0!==c.type.indexOf("image")?e.addClass("ngf-hide"):d&&b.isResizeSupported()?b.resize(c,d.width,d.height,d.quality).then(function(a){j(a)},function(a){throw a}):j(c))});d.$on("$destroy",function(){c()})})}ngFileUpload.service("UploadDataUrl",["UploadBase","$timeout","$q",function(a,b,c){var d=a;return d.dataUrl=function(a,d){if(d&&null!=a.dataUrl||!d&&null!=a.blobUrl){var e=c.defer();return b(function(){e.resolve(d?a.dataUrl:a.blobUrl)}),e.promise}var f=d?a.$ngfDataUrlPromise:a.$ngfBlobUrlPromise;if(f)return f;var g=c.defer();return b(function(){if(window.FileReader&&a&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 8")||a.size<2e4)&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 9")||a.size<4e6)){var c=window.URL||window.webkitURL;if(c&&c.createObjectURL&&!d){var e;try{e=c.createObjectURL(a)}catch(f){return void b(function(){a.blobUrl="",g.reject()})}b(function(){a.blobUrl=e,e&&g.resolve(e)})}else{var h=new FileReader;h.onload=function(c){b(function(){a.dataUrl=c.target.result,g.resolve(c.target.result)})},h.onerror=function(){b(function(){a.dataUrl="",g.reject()})},h.readAsDataURL(a)}}else b(function(){a[d?"dataUrl":"blobUrl"]="",g.reject()})}),f=d?a.$ngfDataUrlPromise=g.promise:a.$ngfBlobUrlPromise=g.promise,f["finally"](function(){delete a[d?"$ngfDataUrlPromise":"$ngfBlobUrlPromise"]}),f},d}]);var c=angular.element("<style>.ngf-hide{display:none !important}</style>");document.getElementsByTagName("head")[0].appendChild(c[0]),ngFileUpload.directive("ngfSrc",["Upload","$timeout",function(a,c){return{restrict:"AE",link:function(d,e,f){b(a,c,d,e,f,"ngfSrc",a.attrGetter("ngfResize",f,d),!1)}}}]),ngFileUpload.directive("ngfBackground",["Upload","$timeout",function(a,c){return{restrict:"AE",link:function(d,e,f){b(a,c,d,e,f,"ngfBackground",a.attrGetter("ngfResize",f,d),!0)}}}]),ngFileUpload.directive("ngfThumbnail",["Upload","$timeout",function(a,c){return{restrict:"AE",link:function(d,e,f){var g=a.attrGetter("ngfSize",f,d);b(a,c,d,e,f,"ngfThumbnail",g,a.attrGetter("ngfAsBackground",f,d))}}}])}(),ngFileUpload.service("UploadValidate",["UploadDataUrl","$q","$timeout",function(a,b,c){function d(a){if(a.length>2&&"/"===a[0]&&"/"===a[a.length-1])return a.substring(1,a.length-1);var b=a.split(","),c="";if(b.length>1)for(var e=0;e<b.length;e++)c+="("+d(b[e])+")",e<b.length-1&&(c+="|");else 0===a.indexOf(".")&&(a="*"+a),c="^"+a.replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]","g"),"\\$&")+"$",c=c.replace(/\\\*/g,".*").replace(/\\\?/g,".");return c}var e=a;return e.registerValidators=function(a,b,c,d){function f(a){angular.forEach(a.$ngfValidations,function(b){a.$setValidity(b.name,b.valid)})}a&&(a.$ngfValidations=[],a.$formatters.push(function(g){return e.attrGetter("ngfValidateLater",c,d)||!a.$$ngfValidated?(e.validate(g,a,c,d,!1,function(){f(a),a.$$ngfValidated=!1}),g&&0===g.length&&(g=null),!b||null!=g&&0!==g.length||b.val()&&b.val(null)):(f(a),a.$$ngfValidated=!1),g}))},e.validatePattern=function(a,b){if(!b)return!0;var c=new RegExp(d(b),"gi");return null!=a.type&&c.test(a.type.toLowerCase())||null!=a.name&&c.test(a.name.toLowerCase())},e.validate=function(a,b,c,d,f,g){function h(c,d,e){if(a){for(var f="ngf"+c[0].toUpperCase()+c.substr(1),g=a.length,h=null;g--;){var i=a[g],k=j(f,{$file:i});null==k&&(k=d(j("ngfValidate")||{}),h=null==h?!0:h),null!=k&&(e(i,k)||(i.$error=c,i.$errorParam=k,a.splice(g,1),h=!1))}null!==h&&b.$ngfValidations.push({name:c,valid:h})}}function i(c,d,e,f,h){if(a){var i=0,l=!1,m="ngf"+c[0].toUpperCase()+c.substr(1);a=void 0===a.length?[a]:a,angular.forEach(a,function(a){if(0!==a.type.search(e))return!0;var n=j(m,{$file:a})||d(j("ngfValidate",{$file:a})||{});n&&(k++,i++,f(a,n).then(function(b){h(b,n)||(a.$error=c,a.$errorParam=n,l=!0)},function(){j("ngfValidateForce",{$file:a})&&(a.$error=c,a.$errorParam=n,l=!0)})["finally"](function(){k--,i--,i||b.$ngfValidations.push({name:c,valid:!l}),k||g.call(b,b.$ngfValidations)}))})}}b=b||{},b.$ngfValidations=b.$ngfValidations||[],angular.forEach(b.$ngfValidations,function(a){a.valid=!0});var j=function(a,b){return e.attrGetter(a,c,d,b)};if(f)return void g.call(b);if(b.$$ngfValidated=!0,null==a||0===a.length)return void g.call(b);if(a=void 0===a.length?[a]:a.slice(0),h("pattern",function(a){return a.pattern},e.validatePattern),h("minSize",function(a){return a.size&&a.size.min},function(a,b){return a.size>=e.translateScalars(b)}),h("maxSize",function(a){return a.size&&a.size.max},function(a,b){return a.size<=e.translateScalars(b)}),h("validateFn",function(){return null},function(a,b){return b===!0||null===b||""===b}),!a.length)return void g.call(b,b.$ngfValidations);var k=0;i("maxHeight",function(a){return a.height&&a.height.max},/image/,this.imageDimensions,function(a,b){return a.height<=b}),i("minHeight",function(a){return a.height&&a.height.min},/image/,this.imageDimensions,function(a,b){return a.height>=b}),i("maxWidth",function(a){return a.width&&a.width.max},/image/,this.imageDimensions,function(a,b){return a.width<=b}),i("minWidth",function(a){return a.width&&a.width.min},/image/,this.imageDimensions,function(a,b){return a.width>=b}),i("ratio",function(a){return a.ratio},/image/,this.imageDimensions,function(a,b){for(var c=b.toString().split(","),d=!1,e=0;e<c.length;e++){var f=c[e],g=f.search(/x/i);f=g>-1?parseFloat(f.substring(0,g))/parseFloat(f.substring(g+1)):parseFloat(f),Math.abs(a.width/a.height-f)<1e-4&&(d=!0)}return d}),i("maxDuration",function(a){return a.duration&&a.duration.max},/audio|video/,this.mediaDuration,function(a,b){return a<=e.translateScalars(b)}),i("minDuration",function(a){return a.duration&&a.duration.min},/audio|video/,this.mediaDuration,function(a,b){return a>=e.translateScalars(b)}),i("validateAsyncFn",function(){return null},/./,function(a,b){return b},function(a){return a===!0||null===a||""===a}),k||g.call(b,b.$ngfValidations)},e.imageDimensions=function(a){if(a.width&&a.height){var d=b.defer();return c(function(){d.resolve({width:a.width,height:a.height})}),d.promise}if(a.$ngfDimensionPromise)return a.$ngfDimensionPromise;var f=b.defer();return c(function(){return 0!==a.type.indexOf("image")?void f.reject("not image"):void e.dataUrl(a).then(function(b){function d(){var b=h[0].clientWidth,c=h[0].clientHeight;h.remove(),a.width=b,a.height=c,f.resolve({width:b,height:c})}function e(){h.remove(),f.reject("load error")}function g(){c(function(){h[0].parentNode&&(h[0].clientWidth?d():i>10?e():g())},1e3)}var h=angular.element("<img>").attr("src",b).css("visibility","hidden").css("position","fixed");h.on("load",d),h.on("error",e);var i=0;g(),angular.element(document.getElementsByTagName("body")[0]).append(h)},function(){f.reject("load error")})}),a.$ngfDimensionPromise=f.promise,a.$ngfDimensionPromise["finally"](function(){delete a.$ngfDimensionPromise}),a.$ngfDimensionPromise},e.mediaDuration=function(a){if(a.duration){var d=b.defer();return c(function(){d.resolve(a.duration)}),d.promise}if(a.$ngfDurationPromise)return a.$ngfDurationPromise;var f=b.defer();return c(function(){return 0!==a.type.indexOf("audio")&&0!==a.type.indexOf("video")?void f.reject("not media"):void e.dataUrl(a).then(function(b){function d(){var b=h[0].duration;a.duration=b,h.remove(),f.resolve(b)}function e(){h.remove(),f.reject("load error")}function g(){c(function(){h[0].parentNode&&(h[0].duration?d():i>10?e():g())},1e3)}var h=angular.element(0===a.type.indexOf("audio")?"<audio>":"<video>").attr("src",b).css("visibility","none").css("position","fixed");h.on("loadedmetadata",d),h.on("error",e);var i=0;g(),angular.element(document.body).append(h)},function(){f.reject("load error")})}),a.$ngfDurationPromise=f.promise,a.$ngfDurationPromise["finally"](function(){delete a.$ngfDurationPromise}),a.$ngfDurationPromise},e}]),ngFileUpload.service("UploadResize",["UploadValidate","$q","$timeout",function(a,b,c){var d=a,e=function(a,b,c,d){var e=Math.min(c/a,d/b);return{width:a*e,height:b*e}},f=function(a,c,d,f,g){var h=b.defer(),i=document.createElement("canvas"),j=document.createElement("img");return j.onload=function(){try{var a=e(j.width,j.height,c,d);i.width=a.width,i.height=a.height;var b=i.getContext("2d");b.drawImage(j,0,0,a.width,a.height),h.resolve(i.toDataURL(g||"image/WebP",f||1))}catch(k){h.reject(k)}},j.onerror=function(){h.reject()},j.src=a,h.promise},g=function(a){for(var b=a.split(","),c=b[0].match(/:(.*?);/)[1],d=atob(b[1]),e=d.length,f=new Uint8Array(e);e--;)f[e]=d.charCodeAt(e);return new Blob([f],{type:c})};return d.isResizeSupported=function(){var a=document.createElement("canvas");return window.atob&&a.getContext&&a.getContext("2d")},d.resize=function(a,e,h,i){var j=b.defer();return 0!==a.type.indexOf("image")?(c(function(){j.resolve("Only images are allowed for resizing!")}),j.promise):(d.dataUrl(a,!0).then(function(b){f(b,e,h,i,a.type).then(function(b){var c=g(b);c.name=a.name,j.resolve(c)},function(){j.reject()})},function(){j.reject()}),j.promise)},d}]),function(){function a(a,c,d,e,f,g,h,i){function j(){return c.attr("disabled")||n("ngfDropDisabled",a)}function k(a,b,c,d){var e=n("ngfDragOverClass",a,{$event:c}),f=n("ngfDragOverClass")||"dragover";if(angular.isString(e))return void d(e);if(e&&(e.delay&&(r=e.delay),e.accept||e.reject)){var g=c.dataTransfer.items;if(null!=g)for(var h=n("ngfPattern",a,{$event:c}),j=0;j<g.length;j++)if("file"===g[j].kind||""===g[j].kind){if(!i.validatePattern(g[j],h)){f=e.reject;break}f=e.accept}}d(f)}function l(a,b,c,d){function e(a,b,c){if(null!=b)if(b.isDirectory){var d=(c||"")+b.name;a.push({name:b.name,type:"directory",path:d});var f=b.createReader(),g=[];i++;var h=function(){f.readEntries(function(d){try{if(d.length)g=g.concat(Array.prototype.slice.call(d||[],0)),h();else{for(var f=0;f<g.length;f++)e(a,g[f],(c?c:"")+b.name+"/");i--}}catch(j){i--,console.error(j)}},function(){i--})};h()}else i++,b.file(function(b){try{i--,b.path=(c?c:"")+b.name,a.push(b)}catch(d){i--,console.error(d)}},function(){i--})}var f=[],i=0,j=a.dataTransfer.items;if(j&&j.length>0&&"file"!==h.protocol())for(var k=0;k<j.length;k++){if(j[k].webkitGetAsEntry&&j[k].webkitGetAsEntry()&&j[k].webkitGetAsEntry().isDirectory){var l=j[k].webkitGetAsEntry();if(l.isDirectory&&!c)continue;null!=l&&e(f,l)}else{var m=j[k].getAsFile();null!=m&&f.push(m)}if(!d&&f.length>0)break}else{var n=a.dataTransfer.files;if(null!=n)for(var o=0;o<n.length&&(f.push(n.item(o)),d||!(f.length>0));o++);}var p=0;!function q(a){g(function(){if(i)10*p++<2e4&&q(10);else{if(!d&&f.length>1){for(k=0;"directory"===f[k].type;)k++;f=[f[k]]}b(f)}},a||0)}()}var m=b(),n=function(a,b,c){return i.attrGetter(a,d,b,c)};if(n("dropAvailable")&&g(function(){a[n("dropAvailable")]?a[n("dropAvailable")].value=m:a[n("dropAvailable")]=m}),!m)return void(n("ngfHideOnDropNotAvailable",a)===!0&&c.css("display","none"));i.registerValidators(e,null,d,a);var o,p=null,q=f(n("ngfStopPropagation")),r=1;c[0].addEventListener("dragover",function(b){if(!j()){if(b.preventDefault(),q(a)&&b.stopPropagation(),navigator.userAgent.indexOf("Chrome")>-1){var e=b.dataTransfer.effectAllowed;b.dataTransfer.dropEffect="move"===e||"linkMove"===e?"move":"copy"}g.cancel(p),o||(o="C",k(a,d,b,function(a){o=a,c.addClass(o)}))}},!1),c[0].addEventListener("dragenter",function(b){j()||(b.preventDefault(),q(a)&&b.stopPropagation())},!1),c[0].addEventListener("dragleave",function(){j()||(p=g(function(){o&&c.removeClass(o),o=null},r||1))},!1),c[0].addEventListener("drop",function(b){j()||(b.preventDefault(),q(a)&&b.stopPropagation(),o&&c.removeClass(o),o=null,l(b,function(c){i.updateModel(e,d,a,n("ngfChange")||n("ngfDrop"),c,b)},n("ngfAllowDir",a)!==!1,n("multiple")||n("ngfMultiple",a)))},!1),c[0].addEventListener("paste",function(b){if(!j()){var c=[],f=b.clipboardData||b.originalEvent.clipboardData;if(f&&f.items){for(var g=0;g<f.items.length;g++)-1!==f.items[g].type.indexOf("image")&&c.push(f.items[g].getAsFile());i.updateModel(e,d,a,n("ngfChange")||n("ngfDrop"),c,b)}}},!1)}function b(){var a=document.createElement("div");return"draggable"in a&&"ondrop"in a&&!/Edge\/12./i.test(navigator.userAgent)}ngFileUpload.directive("ngfDrop",["$parse","$timeout","$location","Upload",function(b,c,d,e){return{restrict:"AEC",require:"?ngModel",link:function(f,g,h,i){a(f,g,h,i,b,c,d,e)}}}]),ngFileUpload.directive("ngfNoFileDrop",function(){return function(a,c){b()&&c.css("display","none")}}),ngFileUpload.directive("ngfDropAvailable",["$parse","$timeout","Upload",function(a,c,d){return function(e,f,g){if(b()){var h=a(d.attrGetter("ngfDropAvailable",g));c(function(){h(e),h.assign&&h.assign(e,!0)})}}}])}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbmZpZy5qcyIsImNvbXBhbmllcy9jb21wYW5pZXMubW9kdWxlLmpzIiwiZmVsbG93cy9mZWxsb3dzLm1vZHVsZS5qcyIsImhvbWUvaG9tZS5tb2R1bGUuanMiLCJwcm9maWxlL3Byb2ZpbGUubW9kdWxlLmpzIiwidm90ZXMvdm90ZXMubW9kdWxlLmpzIiwiY29tcGFuaWVzL2NvbnRyb2xsZXJzL2NvbXBhbmllcy5jb250cm9sbGVyLmpzIiwiY29tcGFuaWVzL2NvbnRyb2xsZXJzL2NvbXBhbnkuY29udHJvbGxlci5qcyIsImNvbXBhbmllcy9kaXJlY3RpdmVzL2NvbXBhbnlDYXJkLmRpcmVjdGl2ZS5qcyIsImNvbXBhbmllcy9zZXJ2aWNlcy9jb21wYW5pZXMuc2VydmljZS5qcyIsImZlbGxvd3MvY29udHJvbGxlcnMvZmVsbG93LmNvbnRyb2xsZXIuanMiLCJmZWxsb3dzL2NvbnRyb2xsZXJzL2ZlbGxvd3MuY29udHJvbGxlci5qcyIsImZlbGxvd3MvZGlyZWN0aXZlcy9mZWxsb3dDYXJkLmRpcmVjdGl2ZS5qcyIsImZlbGxvd3Mvc2VydmljZXMvZmVsbG93cy5zZXJ2aWNlLmpzIiwiaG9tZS9jb250cm9sbGVycy9ob21lLmNvbnRyb2xsZXIuanMiLCJwcm9maWxlL2NvbnRyb2xsZXJzL2FkbWluUHJvZmlsZS5jb250cm9sbGVyLmpzIiwicHJvZmlsZS9jb250cm9sbGVycy9jb21wYW55UHJvZmlsZS5jb250cm9sbGVyLmpzIiwicHJvZmlsZS9jb250cm9sbGVycy9mZWxsb3dzUHJvZmlsZS5jb250cm9sbGVyLmpzIiwicHJvZmlsZS9jb250cm9sbGVycy9wcm9maWxlLmNvbnRyb2xsZXIuanMiLCJwcm9maWxlL3NlcnZpY2VzL3RhZ3Muc2VydmljZS5qcyIsInByb2ZpbGUvc2VydmljZXMvdXNlci5zZXJ2aWNlLmpzIiwidm90ZXMvY29udHJvbGxlcnMvdm90ZXMuY29udHJvbGxlci5qcyIsInZvdGVzL3NlcnZpY2VzL3ZvdGVzLnNlcnZpY2UuanMiLCJuZy1maWxlLXVwbG9hZC5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOVRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzRUE7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGFwcC5yb3V0ZXNcbiAqIEBkZXNjICAgIGNvbnRhaW5zIHRoZSByb3V0ZXMgZm9yIHRoZSBhcHBcbiAqL1xuXG4gdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ25nUm91dGUnLCAnbmdDb29raWVzJywgICduZ0ZpbGVVcGxvYWQnLCAndWkuYm9vdHN0cmFwJyxcbiAgICAnYXBwLmNvbmZpZycsICdhcHAuaG9tZScsICdhcHAuY29tcGFuaWVzJywgJ2FwcC5mZWxsb3dzJywgJ2FwcC5wcm9maWxlJywgJ2FwcC52b3RlcycgXSlcbiAgICAucnVuKHJ1bik7XG5cbi8qKlxuICogICAqIEBuYW1lIGNvbmZpZ1xuICogICAgICogQGRlc2MgRGVmaW5lIHZhbGlkIGFwcGxpY2F0aW9uIHJvdXRlc1xuICogICAgICAgKi9cbiBhcHAuY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcil7XG5cbiAgICAkcm91dGVQcm92aWRlclxuICAgIC53aGVuKCcvJywge1xuICAgICAgICBjb250cm9sbGVyICA6ICdIb21lQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsIDogJ3NvdXJjZS9hcHAvaG9tZS9ob21lLmh0bWwnXG4gICAgfSlcbiAgICAud2hlbignL2ZlbGxvd3MnLCB7XG4gICAgICAgIGNvbnRyb2xsZXI6ICdGZWxsb3dzQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc291cmNlL2FwcC9mZWxsb3dzL2ZlbGxvd3MuaHRtbCdcbiAgICB9KVxuICAgIC53aGVuKCcvZmVsbG93cy86ZmVsbG93X2lkLzpmZWxsb3dfbmFtZScsIHtcbiAgICAgICAgY29udHJvbGxlcjogJ0ZlbGxvd0NvbnRyb2xsZXInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3NvdXJjZS9hcHAvZmVsbG93cy9mZWxsb3cuaHRtbCdcbiAgICB9KVxuICAgIC53aGVuKCcvY29tcGFuaWVzJywge1xuICAgICAgICBjb250cm9sbGVyOiAnQ29tcGFuaWVzQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc291cmNlL2FwcC9jb21wYW5pZXMvY29tcGFuaWVzLmh0bWwnXG4gICAgfSlcbiAgICAud2hlbignL2NvbXBhbmllcy86Y29tcGFueV9pZC86Y29tcGFueV9uYW1lJywge1xuICAgICAgICBjb250cm9sbGVyOiAnQ29tcGFueUNvbnRyb2xsZXInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3NvdXJjZS9hcHAvY29tcGFuaWVzL2NvbXBhbnkuaHRtbCdcbiAgICB9KVxuXG4gICAgLndoZW4oJy9wcm9maWxlJywge1xuICAgICAgICBjb250cm9sbGVyOiAnUHJvZmlsZUNvbnRyb2xsZXInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3NvdXJjZS9hcHAvcHJvZmlsZS9wcm9maWxlLmh0bWwnXG4gICAgfSlcblxuICAgIC53aGVuKCcvcHJvZmlsZS9hZG1pbicsIHtcbiAgICAgICAgY29udHJvbGxlcjogJ0FkbWluUHJvZmlsZUNvbnRyb2xsZXInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3NvdXJjZS9hcHAvcHJvZmlsZS9wYXJ0aWFscy9hZG1pbi1wcm9maWxlLmh0bWwnXG4gICAgfSlcblxuICAgIC53aGVuKCcvcHJvZmlsZS9mZWxsb3cnLCB7XG4gICAgICAgIGNvbnRyb2xsZXI6ICdGZWxsb3dzUHJvZmlsZUNvbnRyb2xsZXInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3NvdXJjZS9hcHAvcHJvZmlsZS9wYXJ0aWFscy9mZWxsb3ctcHJvZmlsZS5odG1sJ1xuICAgIH0pXG5cbiAgICAud2hlbignL3Byb2ZpbGUvY29tcGFueScsIHtcbiAgICAgICAgY29udHJvbGxlcjogJ0NvbXBhbnlQcm9maWxlQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc291cmNlL2FwcC9wcm9maWxlL3BhcnRpYWxzL2NvbXBhbnktcHJvZmlsZS5odG1sJ1xuICAgIH0pXG5cbiAgICAud2hlbiggJy92b3RlcycsIHtcbiAgICAgICAgY29udHJvbGxlcjogJ1ZvdGVzQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc291cmNlL2FwcC92b3Rlcy9wYXJ0aWFscy92b3Rlcy5odG1sJ1xuICAgIH0pXG5cbiAgICAub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogJy8nIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ1JvdXRpbmdDb250cm9sbGVyJywgUm91dGluZ0NvbnRyb2xsZXIpXG4uY29udHJvbGxlcignTG9naW5Nb2RhbEluc3RhbmNlQ29udHJvbGxlcicsIExvZ2luTW9kYWxJbnN0YW5jZUNvbnRyb2xsZXIpO1xuXG5Sb3V0aW5nQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJG1vZGFsJywgJyR3aW5kb3cnLCAnVXNlcicsICckbG9jYXRpb24nLCAnJGFuY2hvclNjcm9sbCddO1xuTG9naW5Nb2RhbEluc3RhbmNlQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHdpbmRvdycsICckbW9kYWxJbnN0YW5jZScsICdVc2VyJ107XG5cbmZ1bmN0aW9uIFJvdXRpbmdDb250cm9sbGVyKCRzY29wZSwgJG1vZGFsLCAkd2luZG93LCBVc2VyLCAkbG9jYXRpb24sICRhbmNob3JTY3JvbGwpIHtcblxuICAgICRzY29wZS5pc1VzZXJMb2dnZWRJbiA9IGZhbHNlO1xuICAgIHVwZGF0ZUxvZ2luU3RhdHVzKCk7XG5cbiAgICAkc2NvcGUuc2Nyb2xsVG8gPSBmdW5jdGlvbihpZCl7XG5cbiAgICAgICAgJGxvY2F0aW9uLmhhc2goaWQpO1xuICAgICAgICAkYW5jaG9yU2Nyb2xsKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvZ2luU3RhdHVzKCl7XG5cbiAgICAgICAgJHNjb3BlLmlzVXNlckxvZ2dlZEluID0gVXNlci5pc1VzZXJMb2dnZWRJbigpO1xuICAgIH1cblxuICAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkbW9kYWwub3Blbih7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NvdXJjZS9hcHAvcHJvZmlsZS9wYXJ0aWFscy9sb2dpbi1wYWdlLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luTW9kYWxJbnN0YW5jZUNvbnRyb2xsZXInLFxuICAgICAgICAgICAgc2l6ZTogJydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2cgaW4gY29tcGxldGVcIik7XG4gICAgICAgICAgICB1cGRhdGVMb2dpblN0YXR1cygpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAkc2NvcGUubG9nb3V0VXNlciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBMb2dvdXRcIik7XG4gICAgICAgIFVzZXIuQ2xlYXJDcmVkZW50aWFscygpO1xuICAgICAgICAkc2NvcGUuaXNVc2VyTG9nZ2VkSW4gPSBmYWxzZTtcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBMb2dpbk1vZGFsSW5zdGFuY2VDb250cm9sbGVyICgkc2NvcGUsICR3aW5kb3csICRtb2RhbEluc3RhbmNlLCBVc2VyKSB7XG5cbiAgICAvLyBzYXZlIHRoaXMgdGhyb3VnaCBhIHJlZmVzaFxuICAgICRzY29wZS5sb2dpbkZvcm0gPSB7XG5cbiAgICAgICAgZW1haWw6IFwiXCIsXG4gICAgICAgIHBhc3N3b3JkOiBcIlwiLFxuICAgICAgICBlcnJvcnM6IFtdXG4gICAgfTtcblxuICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKGxvZ2luRm9ybSkge1xuXG4gICAgICAgICRzY29wZS5sb2dpbkZvcm0uZXJyb3JzID0gW107XG5cbiAgICAgICAgY29uc29sZS5sb2cobG9naW5Gb3JtKTtcbiAgICAgICAgVXNlci5sb2dpbihsb2dpbkZvcm0pLnN1Y2Nlc3MoZnVuY3Rpb24odXNlcil7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXIpO1xuICAgICAgICAgICAgLy9Vc2VyLmN1cnJlbnRVc2VyID0gdXNlclxuICAgICAgICAgICAgVXNlci5TZXRDcmVkZW50aWFscyh1c2VyLmlkLCB1c2VyLmVtYWlsLCB1c2VyLnVzZXJUeXBlKTtcbiAgICAgICAgICAgICR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xuXG4gICAgICAgIH0pLmVycm9yKCBmdW5jdGlvbihlcnJvcil7XG5cbiAgICAgICAgICAgICRzY29wZS5sb2dpbkZvcm0uZXJyb3JzLnB1c2goXCJJbnZhbGlkIHVzZXIgY3JlZGVudGlhbHNcIik7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gICAgfTtcbn1cblxuXG5ydW4uJGluamVjdCA9IFsnJGNvb2tpZVN0b3JlJywgJ1VzZXInXTtcbmZ1bmN0aW9uIHJ1bigkY29va2llU3RvcmUsIFVzZXIpe1xuXG4gICAgLy8ga2VlcCB1c2VyIGxvZ2dlZCBpbiBhZnRlciBwYWdlIHJlZnJlc2hcbiAgICB2YXIgY3VycmVudFVzZXIgPSAkY29va2llU3RvcmUuZ2V0KCdnbG9iYWxzJykgfHwge307XG4gICAgVXNlci5zZXRDdXJyZW50VXNlcihjdXJyZW50VXNlcik7XG5cbiAgICAvL2NvbnNvbGUubG9nKGN1cnJlbnRVc2VyKTtcbiAgICAvL2lmICgkcm9vdFNjb3BlLmdsb2JhbHMuY3VycmVudFVzZXIpIHtcbiAgICAvLyAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gJ0Jhc2ljICcgKyAkcm9vdFNjb3BlLmdsb2JhbHMuY3VycmVudFVzZXIuYXV0aGRhdGE7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuICAgIC8vfVxuXG4gICAgLy8kcm9vdFNjb3BlLiRvbignJGxvY2F0aW9uQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcbiAgICAvLyAgICAvLyByZWRpcmVjdCB0byBsb2dpbiBwYWdlIGlmIG5vdCBsb2dnZWQgaW4gYW5kIHRyeWluZyB0byBhY2Nlc3MgYSByZXN0cmljdGVkIHBhZ2VcbiAgICAvLyAgICB2YXIgcmVzdHJpY3RlZFBhZ2UgPSAkLmluQXJyYXkoJGxvY2F0aW9uLnBhdGgoKSwgWycvbG9naW4nLCAnL3JlZ2lzdGVyJ10pID09PSAtMTtcbiAgICAvLyAgICB2YXIgbG9nZ2VkSW4gPSAkcm9vdFNjb3BlLmdsb2JhbHMuY3VycmVudFVzZXI7XG4gICAgLy8gICAgaWYgKHJlc3RyaWN0ZWRQYWdlICYmICFsb2dnZWRJbikge1xuICAgIC8vICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7XG4gICAgLy8gICAgfVxuICAgIC8vfSk7XG59XG5cblxuLyoqXG4gKiBIZWxwZXIgRnVuY3Rpb25zXG4gKiovXG5cbnZhciBIRkhlbHBlcnMgPSBIRkhlbHBlcnMgfHwge307XG5cbkhGSGVscGVycy5oZWxwZXJzID0ge1xuXG4gICAgc2x1Z2lmeTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gc3RyLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xccysvZywgJy0nKSAgICAgICAgICAgLy8gUmVwbGFjZSBzcGFjZXMgd2l0aCAtXG4gICAgICAgICAgICAucmVwbGFjZSgvW15cXHdcXC1dKy9nLCAnJykgICAgICAgLy8gUmVtb3ZlIGFsbCBub24td29yZCBjaGFyc1xuICAgICAgICAgICAgLnJlcGxhY2UoL1xcLVxcLSsvZywgJy0nKSAgICAgICAgIC8vIFJlcGxhY2UgbXVsdGlwbGUgLSB3aXRoIHNpbmdsZSAtXG4gICAgICAgICAgICAucmVwbGFjZSgvXi0rLywgJycpICAgICAgICAgICAgIC8vIFRyaW0gLSBmcm9tIHN0YXJ0IG9mIHRleHRcbiAgICAgICAgICAgIC5yZXBsYWNlKC8tKyQvLCAnJyk7ICAgICAgICAgICAgLy8gVHJpbSAtIGZyb20gZW5kIG9mIHRleHRcbiAgICB9XG59OyIsIi8qKlxuICogQSBwbGFjZSB0byBwdXQgYXBwIHdpZGUgY29uZmlnIHN0dWZmXG4gKlxuICovXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKVxuICAgIC5jb25zdGFudCgnQ09ORklHJywge1xuICAgICAgICAnQVBQX05BTUUnOiAnSGFja2VyIEZlbGxvdyBQb3J0YWwnLFxuICAgICAgICAnQVBQX1ZFUlNJT04nOiAnMS4wJyxcbiAgICAgICAgJ1NFUlZJQ0VfVVJMJzogJydcbiAgICB9KTtcblxuXG4vL3ZhciByb290VXJsID0gJ2h0dHBzOi8vcXVpZXQtY292ZS02ODMwLmhlcm9rdWFwcC5jb20nO1xuLy8gdmFyIHJvb3RVcmwgPSBcImh0dHBzOi8vYm9pbGluZy1zcHJpbmdzLTc1MjMuaGVyb2t1YXBwLmNvbVwiOyIsIi8qKlxuICogY29tcGFuaWVzIG1vZHVsZVxuICovXG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYXBwLmNvbXBhbmllcycsIFtcbiAgICAgICAgJ2FwcC5jb21wYW5pZXMuY29udHJvbGxlcnMnLFxuICAgICAgICAnYXBwLmNvbXBhbmllcy5zZXJ2aWNlcycsXG4gICAgICAgICdhcHAuY29tcGFuaWVzLmRpcmVjdGl2ZXMnXG4gICAgICAgIF0pO1xuXG4gIC8vZGVjbGFyZSB0aGUgY29udHJvbGxlcnMgbW9kdWxlXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAuY29tcGFuaWVzLmNvbnRyb2xsZXJzJywgW10pO1xuXG4gIC8vZGVjbGFyZSB0aGUgc2VydmljZXMgbW9kdWxlXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAuY29tcGFuaWVzLnNlcnZpY2VzJywgW10pO1xuXG4gIC8vIGRlY2xhcmUgdGhlIGRpcmVjdGl2ZXMgbW9kdWxlXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAuY29tcGFuaWVzLmRpcmVjdGl2ZXMnLCBbXSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIGZlbGxvd3MgbW9kdWxlXG4gKi9cblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAuZmVsbG93cycsIFtcbiAgICAgICAgJ2FwcC5mZWxsb3dzLmNvbnRyb2xsZXJzJyxcbiAgICAgICAgJ2FwcC5mZWxsb3dzLnNlcnZpY2VzJyxcbiAgICAgICAgJ2FwcC5mZWxsb3dzLmRpcmVjdGl2ZXMnXG4gICAgICAgIF0pO1xuXG4gIC8vZGVjbGFyZSB0aGUgY29udHJvbGxlcnMgbW9kdWxlXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAuZmVsbG93cy5jb250cm9sbGVycycsIFtdKTtcblxuICAvL2RlY2xhcmUgdGhlIHNlcnZpY2VzIG1vZHVsZVxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYXBwLmZlbGxvd3Muc2VydmljZXMnLCBbXSk7XG5cbiAgLy9kZWNsYXJlIHRoZSBkaXJlY3RpdmVzIG1vZHVsZVxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYXBwLmZlbGxvd3MuZGlyZWN0aXZlcycsIFtdKTtcblxuXG59KSgpO1xuIiwiLyoqXG4gKiBob21lIG1vZHVsZVxuICovXG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYXBwLmhvbWUnLCBbXG4gICAgICAgICdhcHAuaG9tZS5jb250cm9sbGVycycsXG4gICAgICAgIC8vJ2FwcC5ob21lLnNlcnZpY2VzJ1xuICAgICAgICBdKTtcblxuICAvL2RlY2xhcmUgdGhlIGNvbnRyb2xsZXJzIG1vZHVsZVxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYXBwLmhvbWUuY29udHJvbGxlcnMnLCBbXSk7XG5cbiAgLy9kZWNsYXJlIHRoZSBkaXJlY3RpdmVzIG1vZHVsZVxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYXBwLmhvbWUuZGlyZWN0aXZlcycsIFtdKTtcbiAgICAvL2hvdyBhYm91dCB0aGlzXG59KSgpO1xuIiwiLyoqXG4gKiBwcm9maWxlIG1vZHVsZVxuICovXG5cbiAoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgICAgIGFuZ3VsYXJcbiAgICAgICAgICAubW9kdWxlKCdhcHAucHJvZmlsZScsIFtcbiAgICAgICAgICAgICAgJ2FwcC5wcm9maWxlLmNvbnRyb2xsZXJzJyxcbiAgICAgICAgICAgICAgJ2FwcC5wcm9maWxlLnNlcnZpY2VzJyxcbiAgICAgICAgICAgICAgJ2FwcC5mZWxsb3dzLnNlcnZpY2VzJyxcbiAgICAgICAgICAgICAgJ2FwcC5jb21wYW5pZXMuc2VydmljZXMnXG4gICAgICAgICAgICBdKTtcblxuICAgICAgLy9kZWNsYXJlIHRoZSBjb250cm9sbGVycyBtb2R1bGVcbiAgICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnByb2ZpbGUuY29udHJvbGxlcnMnLCBbXSk7XG5cbiAgICAgLy9kZWNsYXJlIHRoZSBzZXJ2aWNlcyBtb2R1bGVcbiAgICAgYW5ndWxhclxuICAgICAgICAgLm1vZHVsZSgnYXBwLnByb2ZpbGUuc2VydmljZXMnLCBbXSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIHZvdGVzIG1vZHVsZVxuICovXG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnZvdGVzJywgW1xuXG4gICAgICAgICAgICAnYXBwLnZvdGVzLmNvbnRyb2xsZXJzJyxcbiAgICAgICAgICAgICdhcHAudm90ZXMuc2VydmljZXMnXG4gICAgICAgIF0pO1xuXG4gICAgLy9kZWNsYXJlIHRoZSBzZXJ2aWNlcyBtb2R1bGVcbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC52b3Rlcy5zZXJ2aWNlcycsIFtdKTtcblxuXG4gICAgLy9kZWNsYXJlIHRoZSBjb250cm9sbGVycyBtb2R1bGVcbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC52b3Rlcy5jb250cm9sbGVycycsIFtdKTtcblxuXG5cbn0pKCk7XG4iLCIvKipcbiAqIENvbXBhbmllc0NvbnRyb2xsZXJcbiAqIEBuYW1lc3BhY2UgYXBwLmNvbXBhbmllcy5jb250cm9sbGVyc1xuICovXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvbXBhbmllcy5jb250cm9sbGVycycpXG4gICAgICAgIC5jb250cm9sbGVyKCdDb21wYW5pZXNDb250cm9sbGVyJywgQ29tcGFuaWVzQ29udHJvbGxlcik7XG5cbiAgICBDb21wYW5pZXNDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbW9kYWwnLCAnQ29tcGFuaWVzJ107XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlIENvbXBhbmllc0NvbnRyb2xsZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBDb21wYW5pZXNDb250cm9sbGVyKCRzY29wZSwgJG1vZGFsLCBDb21wYW5pZXMpIHtcblxuICAgICAgICBhY3RpdmF0ZSgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYWN0aXZhdGVkIGNvbXBhbmllcyBjb250cm9sbGVyIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgQ29tcGFuaWVzLmFsbCgpLnN1Y2Nlc3MoZnVuY3Rpb24gKGNvbXBhbmllcykge1xuXG4gICAgICAgICAgICAkc2NvcGUuY29tcGFuaWVzID0gY29tcGFuaWVzO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuaGVscGVycyA9IEhGSGVscGVycy5oZWxwZXJzO1xuXG4gICAgICAgICRzY29wZS5vcGVuTW9kYWwgPSBmdW5jdGlvbiAoY29tcGFueSkge1xuXG4gICAgICAgICAgICAkc2NvcGUuY29tcGFueSA9IGNvbXBhbnk7XG5cbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJG1vZGFsLm9wZW4oe1xuXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzb3VyY2UvYXBwL2NvbXBhbmllcy9wYXJ0aWFscy9jb21wYW55X2RldGFpbF92aWV3Lmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb21wYW5pZXNNb2RhbEluc3RhbmNlQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wYW55O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcGFuaWVzIE1vZGFsIEluc3RhbmNlIENvbnRyb2xsZXJcbiAgICAgKiBAbmFtZXNwYWNlIGFwcC5mZWxsb3dzLmNvbnRyb2xsZXJzXG4gICAgICovXG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5jb21wYW5pZXMuY29udHJvbGxlcnMnKVxuICAgICAgICAuY29udHJvbGxlcignQ29tcGFuaWVzTW9kYWxJbnN0YW5jZUNvbnRyb2xsZXInLCBDb21wYW5pZXNNb2RhbEluc3RhbmNlQ29udHJvbGxlcik7XG5cbiAgICBDb21wYW5pZXNNb2RhbEluc3RhbmNlQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJG1vZGFsSW5zdGFuY2UnLFxuICAgICAgICAnY29tcGFueScsICdWb3RlcycsICdVc2VyJ107XG5cbiAgICBmdW5jdGlvbiBDb21wYW5pZXNNb2RhbEluc3RhbmNlQ29udHJvbGxlcigkc2NvcGUsICRtb2RhbEluc3RhbmNlLCBjb21wYW55LCBWb3RlcywgVXNlcikge1xuXG4gICAgICAgICRzY29wZS5jb21wYW55ID0gY29tcGFueTtcblxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuY29tcGFueSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xuICAgICAgICB9O1xuXG5cbiAgICB9XG5cbn0pKCk7XG4iLCIvKipcbiAqIENvbXBhbmllc0NvbnRyb2xsZXJcbiAqIEBuYW1lc3BhY2UgYXBwLmNvbXBhbmllcy5jb250cm9sbGVyc1xuICovXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvbXBhbmllcy5jb250cm9sbGVycycpXG4gICAgICAgIC5jb250cm9sbGVyKCdDb21wYW55Q29udHJvbGxlcicsIENvbXBhbnlDb250cm9sbGVyKTtcblxuICAgIENvbXBhbnlDb250cm9sbGVyLiRpbmplY3QgPSBbICckcm91dGVQYXJhbXMnLCAnJHNjb3BlJywgJyR0aW1lb3V0JywgJ0NvbXBhbmllcycsICdVc2VyJywgJ1ZvdGVzJ107XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlIENvbXBhbmllc0NvbnRyb2xsZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBDb21wYW55Q29udHJvbGxlciggJHJvdXRlUGFyYW1zLCAkc2NvcGUsICR0aW1lb3V0LCBDb21wYW5pZXMsIFVzZXIsIFZvdGVzKSB7XG5cbiAgICAgICAgYWN0aXZhdGUoKTtcblxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2FjdGl2YXRlZCBjb21wYW5pZXMgY29udHJvbGxlciEnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgJHNjb3BlLnZvdGVzRm9yID0gW107XG4gICAgICAgICRzY29wZS52b3Rlc0Nhc3QgPSBbXTtcbiAgICAgICAgJHNjb3BlLmN1cnJlbnRVc2VyID0gVXNlci5nZXRDdXJyZW50VXNlcigpO1xuXG4gICAgICAgIENvbXBhbmllcy5nZXQoICRyb3V0ZVBhcmFtcy5jb21wYW55X2lkICkuc3VjY2VzcyhmdW5jdGlvbiAoY29tcGFueSkge1xuXG4gICAgICAgICAgICAkc2NvcGUuY29tcGFueSA9IGNvbXBhbnk7XG5cbiAgICAgICAgICAgIFVzZXIuZ2V0Vm90ZXMoIGNvbXBhbnkudXNlcl9pZCApLnN1Y2Nlc3MoIGZ1bmN0aW9uKCB2b3RlcyApe1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnZvdGVzRm9yID0gdm90ZXMudm90ZXNGb3I7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnZvdGVzQ2FzdCA9IHZvdGVzLnZvdGVzQ2FzdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY3VycmVudFVzZXJWb3RlZCA9IGZ1bmN0aW9uIGN1cnJlbnRVc2VyVm90ZWQoKXtcblxuICAgICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCAkc2NvcGUudm90ZXNGb3IubGVuZ3RoOyBpKysgKXtcblxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gJHNjb3BlLnZvdGVzRm9yW2ldO1xuICAgICAgICAgICAgICAgIGlmKCBlbGVtZW50LmlkID09ICRzY29wZS5jdXJyZW50VXNlci5pZCApIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0ZlbGxvdyA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHJldHVybiAoICRzY29wZS5jdXJyZW50VXNlci51c2VyVHlwZSA9PT0gXCJGZWxsb3dcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnZvdGUgPSBmdW5jdGlvbiB2b3RlKGNvbXBhbnkpIHtcblxuXG4gICAgICAgICAgICBpZiggJHNjb3BlLmlzRmVsbG93KCkgKSB7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gVm90ZXMuY3JlYXRlKGN1cnJlbnQuaWQsIGNvbXBhbnkudXNlcl9pZClcbiAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24gKHZvdGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzOiBcIit2b3RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2b3RlO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIitlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCAnZG9uZScgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvbXBhbmllcy5kaXJlY3RpdmVzJylcbiAgICAgICAgLmRpcmVjdGl2ZSgnY29tcGFueUNhcmQnLCBjb21wYW55Q2FyZCk7XG5cblxuICAgIGZ1bmN0aW9uIGNvbXBhbnlDYXJkKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgc2NvcGU6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9zb3VyY2UvYXBwL2NvbXBhbmllcy9wYXJ0aWFscy9jb21wYW55X2NhcmQuaHRtbCcvKixcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICAgICAgICAgIGVsZW0uYmluZCgnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICB9O1xuICAgIH1cblxufSkoKTsiLCIvKipcbiogQ29tcGFuaWVzXG4qIEBuYW1lc3BhY2UgYXBwLmNvbXBhbmllcy5zZXJ2aWNlc1xuKi9cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYXBwLmNvbXBhbmllcy5zZXJ2aWNlcycpXG4gICAgLnNlcnZpY2UoJ0NvbXBhbmllcycsIENvbXBhbmllcyk7XG5cbiAgQ29tcGFuaWVzLiRpbmplY3QgPSBbJyRodHRwJywgJ1VwbG9hZCcsICdDT05GSUcnXTtcblxuICAvKipcbiAgKiBAbmFtZXNwYWNlIENvbXBhbmllc1xuICAqL1xuICBmdW5jdGlvbiBDb21wYW5pZXMoJGh0dHAsIFVwbG9hZCwgQ09ORklHKSB7XG5cbiAgICB2YXIgcm9vdFVybCA9IENPTkZJRy5TRVJWSUNFX1VSTDtcblxuICAgIHJldHVybiB7XG4gICAgICBhbGw6IGFsbCxcbiAgICAgIGdldDogZ2V0LFxuICAgICAgZ2V0QnlVc2VySWQ6IGdldEJ5VXNlcklkLFxuICAgICAgY3JlYXRlOiBjcmVhdGUsXG4gICAgICB1cGRhdGU6IHVwZGF0ZSxcbiAgICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgICB9O1xuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIGFsbFxuICAgICAqIEBkZXNjIGdldCBhbGwgdGhlIGNvbXBhbmllc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFsbCgpIHtcbiAgICAgIHJldHVybiAkaHR0cC5nZXQocm9vdFVybCArICcvYXBpL3YxL2NvbXBhbmllcy8nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBnZXRcbiAgICAgKiBAZGVzYyBnZXQganVzdCBvbmUgY29tcGFueVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldChpZCkge1xuICAgICAgcmV0dXJuICRodHRwLmdldChyb290VXJsICsgJy9hcGkvdjEvY29tcGFuaWVzLycgKyBwYXJzZUludChpZCkgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIEBuYW1lIGdldEJ5VXNlcklkXG4gICAgKiBAZGVzYyBnZXQganVzdCBvbmUgY29tcGFueSBieSB1c2VyIGlkXG4gICAgKi9cbiAgICBmdW5jdGlvbiBnZXRCeVVzZXJJZCh1c2VyX2lkKSB7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KHJvb3RVcmwgKyAnL2FwaS92MS9jb21wYW5pZXMvdXNlcl9pZC8nICsgcGFyc2VJbnQodXNlcl9pZCkgKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIGNyZWF0ZVxuICAgICAqIEBkZXNjIGNyZWVhdGUgYSBuZXcgY29tcGFueSByZWNvcmRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUoY29tcGFueSkge1xuICAgICAgcmV0dXJuICRodHRwLnBvc3Qocm9vdFVybCArICcvYXBpL3YxL2NvbXBhbmllcy8nLCBjb21wYW55KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSB1cGRhdGVcbiAgICAgKiBAZGVzYyB1cGRhdGVzIGEgY29tcGFueSByZWNvcmRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGUoY29tcGFueSkge1xuXG4gICAgICByZXR1cm4gVXBsb2FkLnVwbG9hZCh7XG4gICAgICAgIHVybDogcm9vdFVybCArICcvYXBpL3YxL2NvbXBhbmllcy8nICsgY29tcGFueS5pZCxcbiAgICAgICAgZmllbGRzOiBjb21wYW55LFxuICAgICAgICBmaWxlOiBjb21wYW55LmZpbGUsXG4gICAgICAgIG1ldGhvZDogJ1BVVCdcblxuICAgICAgfSk7XG5cbiAgICAgIC8vcmV0dXJuICRodHRwLnB1dChyb290VXJsICsgJy9hcGkvdjEvY29tcGFuaWVzLycgKyBpZCwgY29tcGFueSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgZGVzdHJveVxuICAgICAqIEBkZXNjIGRlc3Ryb3kgYSBjb21wYW55IHJlY29yZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRlc3Ryb3koaWQpIHtcbiAgICAgIHJldHVybiAkaHR0cC5kZWxldGUocm9vdFVybCArICcvYXBpL3YxL2NvbXBhbmllcy8nICsgaWQpO1xuICAgIH1cbiAgfVxufSkoKTtcbiIsIi8qKlxuICogRmVsbG93c0NvbnRyb2xsZXJcbiAqIEBuYW1lc3BhY2UgYXBwLmZlbGxvd3MuY29udHJvbGxlcnNcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5mZWxsb3dzLmNvbnRyb2xsZXJzJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0ZlbGxvd0NvbnRyb2xsZXInLCBGZWxsb3dDb250cm9sbGVyKTtcblxuICAgIEZlbGxvd0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHJvdXRlUGFyYW1zJywgJyRzY29wZScsICckdGltZW91dCcsICdGZWxsb3dzJywgJ1VzZXInXTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2UgRmVsbG93c0NvbnRyb2xsZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBGZWxsb3dDb250cm9sbGVyKCRyb3V0ZVBhcmFtcywgJHNjb3BlLCAkdGltZW91dCwgRmVsbG93cywgVXNlcikge1xuXG4gICAgICAgIGFjdGl2YXRlKCk7XG5cbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhY3RpdmF0ZWQgZmVsbG93cyBjb250cm9sbGVyIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnZvdGVzRm9yID0gW107XG4gICAgICAgICRzY29wZS52b3Rlc0Nhc3QgPSBbXTtcbiAgICAgICAgJHNjb3BlLmN1cnJlbnRVc2VyID0gVXNlci5nZXRDdXJyZW50VXNlcigpO1xuXG4gICAgICAgIEZlbGxvd3MuZ2V0KCAkcm91dGVQYXJhbXMuZmVsbG93X2lkICkuc3VjY2VzcyhmdW5jdGlvbiAoZmVsbG93KSB7XG5cbiAgICAgICAgICAgICRzY29wZS5mZWxsb3cgPSBmZWxsb3c7XG5cbiAgICAgICAgICAgIFVzZXIuZ2V0Vm90ZXMoIGZlbGxvdy51c2VyX2lkICkuc3VjY2VzcyggZnVuY3Rpb24oIHZvdGVzICl7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUudm90ZXNGb3IgPSB2b3Rlcy52b3Rlc0ZvcjtcbiAgICAgICAgICAgICAgICAkc2NvcGUudm90ZXNDYXN0ID0gdm90ZXMudm90ZXNDYXN0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jdXJyZW50VXNlclZvdGVkID0gZnVuY3Rpb24gY3VycmVudFVzZXJWb3RlZCgpe1xuXG4gICAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8ICRzY29wZS52b3Rlc0Zvci5sZW5ndGg7IGkrKyApe1xuXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSAkc2NvcGUudm90ZXNGb3JbaV07XG4gICAgICAgICAgICAgICAgaWYoIGVsZW1lbnQuaWQgPT0gJHNjb3BlLmN1cnJlbnRVc2VyLmlkICkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzQ29tcGFueSA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHJldHVybiAoICRzY29wZS5jdXJyZW50VXNlci51c2VyVHlwZSA9PT0gXCJDb21wYW55XCIgKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUudm90ZSA9IGZ1bmN0aW9uIHZvdGUoZmVsbG93KSB7XG5cbiAgICAgICAgICAgIGlmICggJHNjb3BlLmlzQ29tcGFueSgpICkge1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgVm90ZXMuY3JlYXRlKGN1cnJlbnQuaWQsIGZlbGxvdy51c2VyX2lkKVxuICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbiAodm90ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3M6IFwiK3ZvdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZvdGU7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiK2Vycik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRvbmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMzAwMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9XG5cblxufSkoKTtcbiIsIi8qKlxuICogRmVsbG93c0NvbnRyb2xsZXJcbiAqIEBuYW1lc3BhY2UgYXBwLmZlbGxvd3MuY29udHJvbGxlcnNcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5mZWxsb3dzLmNvbnRyb2xsZXJzJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0ZlbGxvd3NDb250cm9sbGVyJywgRmVsbG93c0NvbnRyb2xsZXIpO1xuXG4gICAgRmVsbG93c0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRtb2RhbCcsICdGZWxsb3dzJ107XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlIEZlbGxvd3NDb250cm9sbGVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gRmVsbG93c0NvbnRyb2xsZXIoJHNjb3BlLCAkbW9kYWwsIEZlbGxvd3MpIHtcblxuICAgICAgICBhY3RpdmF0ZSgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYWN0aXZhdGVkIGZlbGxvd3MgY29udHJvbGxlciEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5oZWxwZXJzID0gSEZIZWxwZXJzLmhlbHBlcnM7XG5cbiAgICAgICAgRmVsbG93cy5hbGwoKS5zdWNjZXNzKGZ1bmN0aW9uIChmZWxsb3dzKSB7XG5cbiAgICAgICAgICAgICRzY29wZS5mZWxsb3dzID0gZmVsbG93cztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLm9wZW5Nb2RhbCA9IGZ1bmN0aW9uIChmZWxsb3cpIHtcblxuICAgICAgICAgICAgJHNjb3BlLmZlbGxvdyA9IGZlbGxvdztcblxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkbW9kYWwub3Blbih7XG5cbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NvdXJjZS9hcHAvZmVsbG93cy9wYXJ0aWFscy9mZWxsb3dfZGV0YWlsX3ZpZXcuaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0ZlbGxvd3NNb2RhbEluc3RhbmNlQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIGZlbGxvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZlbGxvdztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfTtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmVsbG93cyBNb2RhbCBJbnN0YW5jZSBDb250cm9sbGVyXG4gICAgICogQG5hbWVzcGFjZSBhcHAuZmVsbG93cy5jb250cm9sbGVyc1xuICAgICAqL1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAuZmVsbG93cy5jb250cm9sbGVycycpXG4gICAgICAgIC5jb250cm9sbGVyKCdGZWxsb3dzTW9kYWxJbnN0YW5jZUNvbnRyb2xsZXInLCBGZWxsb3dzTW9kYWxJbnN0YW5jZUNvbnRyb2xsZXIpO1xuXG4gICAgRmVsbG93c01vZGFsSW5zdGFuY2VDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbW9kYWxJbnN0YW5jZScsICdmZWxsb3cnLFxuICAgICAgICAnVm90ZXMnLCAnVXNlcicsICckdGltZW91dCddO1xuXG4gICAgZnVuY3Rpb24gRmVsbG93c01vZGFsSW5zdGFuY2VDb250cm9sbGVyKCRzY29wZSwgJG1vZGFsSW5zdGFuY2UsIGZlbGxvdywgVm90ZXMsIFVzZXIpIHtcblxuICAgICAgICAkc2NvcGUuZmVsbG93ID0gZmVsbG93O1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coZmVsbG93KTtcblxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiBvaygpIHtcbiAgICAgICAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5mZWxsb3cpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcbiAgICAgICAgfTtcblxuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAuZmVsbG93cy5kaXJlY3RpdmVzJylcbiAgICAuZGlyZWN0aXZlKCdmZWxsb3dDYXJkJywgZmVsbG93Q2FyZCk7XG5cbiAgLy9uZy1mZWxsb3ctY2FyZFxuIGZ1bmN0aW9uIGZlbGxvd0NhcmQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICB0ZW1wbGF0ZVVybDogJy9zb3VyY2UvYXBwL2ZlbGxvd3MvcGFydGlhbHMvZmVsbG93X2NhcmQuaHRtbCcvKixcbiAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSwgYXR0cnMpIHtcbiAgICAgICAgZWxlbS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB9KTtcbiAgICAgICB9ICovXG4gICAgfTtcbiAgfVxufSkoKTtcbiIsIi8qKlxuKiBGZWxsb3dzXG4qIEBuYW1lc3BhY2UgYXBwLmZlbGxvd3Muc2VydmljZXNcbiovXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuXHQubW9kdWxlKCdhcHAuZmVsbG93cy5zZXJ2aWNlcycpXG5cdC5zZXJ2aWNlKCdGZWxsb3dzJywgRmVsbG93cyk7XG5cbiAgRmVsbG93cy4kaW5qZWN0ID0gWyckaHR0cCcsICdVcGxvYWQnLCAnQ09ORklHJ107XG5cblxuXG4gIC8qKlxuICAqIEBuYW1lc3BhY2UgRmVsbG93c1xuICAqIEByZXR1cm5zIHtTZXJ2aWNlfVxuICAqL1xuICBmdW5jdGlvbiBGZWxsb3dzKCRodHRwLCBVcGxvYWQsIENPTkZJRykge1xuXG5cblx0ICB2YXIgcm9vdFVybCA9IENPTkZJRy5TRVJWSUNFX1VSTDtcblxuXHRyZXR1cm4ge1xuXHQgIGFsbDogYWxsLFxuXHQgIGdldDogZ2V0LFxuICAgICAgZ2V0QnlVc2VySWQ6IGdldEJ5VXNlcklkLFxuXHQgIGNyZWF0ZTogY3JlYXRlLFxuXHQgIHVwZGF0ZTogdXBkYXRlLFxuXHQgIGRlc3Ryb3k6IGRlc3Ryb3lcblx0fTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdC8qKlxuXHQgKiBAbmFtZSBhbGxcblx0ICogQGRlc2MgZ2V0IGFsbCB0aGUgZmVsbG93c1xuXHQgKi9cblx0ZnVuY3Rpb24gYWxsKCkge1xuXG5cdFx0cmV0dXJuICRodHRwLmdldChyb290VXJsICsgJy9hcGkvdjEvZmVsbG93cycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBuYW1lIGdldFxuXHQgKiBAZGVzYyBnZXQgb25lIGZlbGxvd1xuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0KGlkKSB7XG5cblx0XHRyZXR1cm4gJGh0dHAuZ2V0KHJvb3RVcmwgKyAnL2FwaS92MS9mZWxsb3dzLycgKyBpZCk7XG5cdH1cblxuXHQvKipcblx0KiBAbmFtZSBnZXRCeVVzZXJJZFxuXHQqIEBkZXNjIGdldCBvbmUgZmVsbG93IGJ5IHVzZXJfaWRcblx0Ki9cblx0ZnVuY3Rpb24gZ2V0QnlVc2VySWQodXNlcl9pZCkge1xuXG5cdCAgcmV0dXJuICRodHRwLmdldChyb290VXJsICsgJy9hcGkvdjEvZmVsbG93cy91c2VyX2lkLycgKyB1c2VyX2lkKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEBuYW1lIGNyZWF0ZVxuXHQgKiBAZGVzYyBjcmVlYXRlIGEgbmV3IGZlbGxvdyByZWNvcmRcblx0ICovXG5cdGZ1bmN0aW9uIGNyZWF0ZShmZWxsb3cpIHtcblx0XHRyZXR1cm4gJGh0dHAucG9zdChyb290VXJsICsgJy9hcGkvdjEvZmVsbG93cy8nLCBmZWxsb3cpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBuYW1lIHVwZGF0ZVxuXHQgKiBAZGVzYyB1cGRhdGVzIGEgZmVsbG93IHJlY29yZFxuXHQgKi9cblx0ZnVuY3Rpb24gdXBkYXRlKGZlbGxvdykge1xuXG4gICAgICAgIHJldHVybiBVcGxvYWQudXBsb2FkKHtcbiAgICAgICAgICAgIHVybDogcm9vdFVybCArICcvYXBpL3YxL2ZlbGxvd3MvJyArIGZlbGxvdy5pZCxcbiAgICAgICAgICAgIGZpZWxkczogZmVsbG93LFxuICAgICAgICAgICAgZmlsZTogZmVsbG93LmZpbGUsXG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnXG5cbiAgICAgICAgfSk7XG5cblx0XHQvL3JldHVybiAkaHR0cC5wdXQocm9vdFVybCArICcvYXBpL3YxL2ZlbGxvd3MvJyArIGZlbGxvdy5pZCwgZmVsbG93KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAbmFtZSBkZXN0cm95XG5cdCAqIEBkZXNjIGRlc3Ryb3kgYSBmZWxsb3cgcmVjb3JkXG5cdCAqL1xuXHRmdW5jdGlvbiBkZXN0cm95KGlkKSB7XG5cdCAgcmV0dXJuICRodHRwLmRlbGV0ZShyb290VXJsICsgJy9hcGkvdjEvZmVsbG93cy8nICsgaWQpO1xuXHR9XG4gIH1cblxufSkoKTtcbiIsIi8qKlxuKiBIb21lQ29udHJvbGxlclxuKiBAbmFtZXNwYWNlIGFwcC5ob21lLmNvbnRyb2xsZXJzXG4qL1xuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAuaG9tZS5jb250cm9sbGVycycpXG4gICAgLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgSG9tZUNvbnRyb2xsZXIpO1xuXG4gIEhvbWVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICdGZWxsb3dzJ107XG5cbiAgLyoqXG4gICogQG5hbWVzcGFjZSBIb21lQ29udHJvbGxlclxuICAqL1xuICBmdW5jdGlvbiBIb21lQ29udHJvbGxlcigkc2NvcGUsIEZlbGxvd3MpIHtcblxuICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICBGZWxsb3dzLmFsbCgpLnN1Y2Nlc3MoZnVuY3Rpb24oZmVsbG93cyl7XG5cbiAgICAgICRzY29wZS5mZWxsb3dzID0gZmVsbG93cztcbiAgICB9KTtcblxuICAgIGFjdGl2YXRlKCk7XG5cbiAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgICAgIC8vY29uc29sZS5sb2coJ2FjdGl2YXRlZCBob21lIGNvbnRyb2xsZXIhJyk7XG4gICAgICAvL0hvbWUuYWxsKCk7XG4gICAgfVxuICB9XG59KSgpO1xuIiwiLyoqXG4qIEFkbWluUHJvZmlsZUNvbnRyb2xsZXJcbiogQG5hbWVzcGFjZSBhcHAucHJvZmlsZS5jb250cm9sbGVyc1xuKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG5cbiAgICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYXBwLnByb2ZpbGUuY29udHJvbGxlcnMnKVxuICAgIC5jb250cm9sbGVyKCdBZG1pblByb2ZpbGVDb250cm9sbGVyJywgQWRtaW5Qcm9maWxlQ29udHJvbGxlcik7XG4gICAgLy8uY29udHJvbGxlcignQWRtaW5Qcm9maWxlTW9kYWxJbnN0YW5jZUNvbnRyb2xsZXInLCBBZG1pblByb2ZpbGVNb2RhbEluc3RhbmNlQ29udHJvbGxlcik7XG5cbiAgICBBZG1pblByb2ZpbGVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9jYXRpb24nLCAnVXNlcicsICdGZWxsb3dzJywgJ0NvbXBhbmllcyddO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZSBBZG1pblByb2ZpbGVDb250cm9sbGVyXG4gICAgICovXG4gICAgIGZ1bmN0aW9uIEFkbWluUHJvZmlsZUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIFVzZXIsIEZlbGxvd3MsIENvbXBhbmllcykge1xuXG4gICAgICAgIC8vIFByb2JhYmx5IGNhbiBoYW5kbGUgdGhpcyBpbiB0aGUgcm91dGVzIG9yIHdpdGggbWlkZGxld2FyZSBvciBzb21lIGtpbmRcbiAgICAgICAgaWYoICFVc2VyLmlzVXNlckxvZ2dlZEluKCkgKSB7XG5cbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL1wiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBjdXJyZW50IHVzZXIgaXMgYW4gQWRtaW5cbiAgICAgICAgdmFyIGN1cnJlbnRVc2VyID0gVXNlci5nZXRDdXJyZW50VXNlcigpO1xuICAgICAgICBpZiggY3VycmVudFVzZXIudXNlclR5cGUgIT09IFwiQWRtaW5cIiApe1xuXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9wcm9maWxlXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8kc2NvcGUub3Blbk1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIHZhciBtb2RhbEluc3RhbmNlID0gJG1vZGFsLm9wZW4oe1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgdGVtcGxhdGVVcmw6ICdzb3VyY2UvYXBwL3Byb2ZpbGUvcGFydGlhbHMvYWRtaW4tY3JlYXRlLXVzZXIuaHRtbCcsXG4gICAgICAgIC8vICAgICAgICBjb250cm9sbGVyOiAnQWRtaW5Qcm9maWxlTW9kYWxJbnN0YW5jZUNvbnRyb2xsZXInLFxuICAgICAgICAvLyAgICAgICAgc2l6ZTogJ2xnJ1xuICAgICAgICAvLyAgICAgICAgLy9yZXNvbHZlOiB7XG4gICAgICAgIC8vICAgICAgICAvLyAgICBmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy8gICAgICAgIC8vfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICB9KTtcbiAgICAgICAgLy99O1xuXG4gICAgICAgIGZ1bmN0aW9uIHVuSGlnaGxpZ2h0RmllbGQoKXtcblxuICAgICAgICAgICAgalF1ZXJ5KFwiaW5wdXRcIikucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIGpRdWVyeShcIiN1c2VyVHlwZVwiKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGhpZ2hsaWdodFBhc3N3b3JkRmllbGQoKXtcblxuICAgICAgICAgICAgalF1ZXJ5KFwiI3Bhc3N3b3JkXCIpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaGlnaGxpZ2h0RW1haWxGaWVsZCgpe1xuXG4gICAgICAgICAgICBqUXVlcnkoXCJlbWFpbFwiKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGhpZ2hsaWdodFVzZXJUeXBlRmllbGQoKXtcblxuICAgICAgICAgICAgalF1ZXJ5KFwidXNlclR5cGVcIikuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZG1pbiBwcm9maWxlIHRhYnNcbiAgICAgICAgJHNjb3BlLnRhYnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6J1VzZXIgTGlzdCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6J3NvdXJjZS9hcHAvcHJvZmlsZS9wYXJ0aWFscy9hZG1pbi91c2VyLWxpc3QuaHRtbCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6J05ldyBVc2VyJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTonc291cmNlL2FwcC9wcm9maWxlL3BhcnRpYWxzL2FkbWluL25ldy11c2VyLWZvcm0uaHRtbCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6J1ZvdGVzJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTonc291cmNlL2FwcC9wcm9maWxlL3BhcnRpYWxzL2FkbWluL2FkbWluLXZvdGVzLmh0bWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cblxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAodXNlcikge1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgcHJldmlvdXMgaGlnaGxpZ2h0cyBpbiBjYXNlIGRhdGEgaXMgbm93IGNvcnJlY3RcbiAgICAgICAgICAgIHVuSGlnaGxpZ2h0RmllbGQoKTtcblxuICAgICAgICAgICAgLy8gaWYgZXZlcnl0aGluZyBpcyBnb29kIGxvZyBkYXRhIGFuZCBjbG9zZSwgZWxzZSBoaWdobGlnaHQgZXJyb3JcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmKHR5cGVvZih1c2VyKSA9PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGluZm9cIik7XG4gICAgICAgICAgICAgICAgLy9oZWlnaGxpZ2h0IGFsbFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodEVtYWlsRmllbGQoKTtcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRQYXNzd29yZEZpZWxkKCk7XG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0VXNlclR5cGVGaWVsZCgpO1xuICAgICAgICAgICAgICAgIGVycm9ycyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZih1c2VyLmVtYWlsKSA9PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCYWQgZW1haWxcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vaGVpZ2hsaWdodCBlbWFpbFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHRFbWFpbEZpZWxkKCk7XG4gICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKHVzZXIucGFzc3dvcmQpID09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJhZCBwYXNzd29yZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy9oZWlnaGxpZ2h0IHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodFBhc3N3b3JkRmllbGQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZih0eXBlb2YodXNlci51c2VyVHlwZSkgPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFkIHR5cGVcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vaGlnaGxpZ2h0IGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHRVc2VyVHlwZUZpZWxkKCk7XG4gICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiggIWVycm9ycyApe1xuXG4gICAgICAgICAgICAgICAgLy8gc2VuZCB1c2VyIHRvIEFQSSB2aWEgU2VydmljZVxuICAgICAgICAgICAgICAgIFVzZXIuY3JlYXRlKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJfaWQgPSByZXNwb25zZS5kYXRhLmlkO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKCB1c2VyLnVzZXJUeXBlID09PSBcIkZlbGxvd1wiICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmZWxsb3dfcG9zdCA9IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfaWQ6IHVzZXJfaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBGZWxsb3dzLmNyZWF0ZShmZWxsb3dfcG9zdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiggdXNlci51c2VyVHlwZSA9PT0gXCJDb21wYW55XCIgKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBhbnlfcG9zdCA9IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfaWQ6IHVzZXJfaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wYW5pZXMuY3JlYXRlKGNvbXBhbnlfcG9zdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8kbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8kc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAkbW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcbiAgICAgICAgLy99O1xuXG4gICAgICAgICRzY29wZS5zd2l0Y2hUeXBlID0gZnVuY3Rpb24odXNlcil7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXIpO1xuXG4gICAgICAgICAgICBpZiggdXNlci51c2VyVHlwZSA9PT0gXCJDb21wYW55XCIgKXtcblxuICAgICAgICAgICAgICAgIGpRdWVyeShcIm9wdGlvbkNvbXBhbnlcIikuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KFwib3B0aW9uRmVsbG93XCIpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggdXNlci51c2VyVHlwZSA9PT0gXCJGZWxsb3dcIiApe1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGZWxsb3cgc2VsZWN0aW9uXCIpO1xuXG4gICAgICAgICAgICAgICAgalF1ZXJ5KFwib3B0aW9uQ29tcGFueVwiKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBqUXVlcnkoXCJvcHRpb25GZWxsb3dcIikuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcbiAgICB9XG5cblxuICAgIC8vZnVuY3Rpb24gQWRtaW5Qcm9maWxlTW9kYWxJbnN0YW5jZUNvbnRyb2xsZXIgKCRzY29wZSwgJG1vZGFsSW5zdGFuY2UsIFVzZXIsIEZlbGxvd3MsIENvbXBhbmllcykge1xuICAgIC8vXG4gICAgLy8gICAgZnVuY3Rpb24gdW5IaWdobGlnaHRGaWVsZCgpe1xuICAgIC8vXG4gICAgLy8gICAgICAgIGpRdWVyeShcImlucHV0XCIpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XG4gICAgLy8gICAgICAgIGpRdWVyeShcIiN1c2VyVHlwZVwiKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAvLyAgICB9XG4gICAgLy9cbiAgICAvLyAgICBmdW5jdGlvbiBoaWdobGlnaHRQYXNzd29yZEZpZWxkKCl7XG4gICAgLy9cbiAgICAvLyAgICAgICAgalF1ZXJ5KFwiI3Bhc3N3b3JkXCIpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgIC8vICAgIH1cbiAgICAvL1xuICAgIC8vICAgIGZ1bmN0aW9uIGhpZ2hsaWdodEVtYWlsRmllbGQoKXtcbiAgICAvL1xuICAgIC8vICAgICAgICBqUXVlcnkoXCJlbWFpbFwiKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAvLyAgICB9XG4gICAgLy9cbiAgICAvLyAgICBmdW5jdGlvbiBoaWdobGlnaHRVc2VyVHlwZUZpZWxkKCl7XG4gICAgLy9cbiAgICAvLyAgICAgICAgalF1ZXJ5KFwidXNlclR5cGVcIikuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgLy8gICAgfVxuICAgIC8vXG4gICAgLy8gICAgJHNjb3BlLnVzZXIgPSB7XG4gICAgLy8gICAgICAgIGVtYWlsOiBcIlwiLFxuICAgIC8vICAgICAgICBwYXNzd29yZDogXCJcIixcbiAgICAvLyAgICAgICAgdXNlclR5cGU6IFwiXCJcbiAgICAvLyAgICB9O1xuICAgIC8vXG4gICAgLy8gICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAvL1xuICAgIC8vICAgICAgICAvKioqKioqKioqKkRFQlVHIFNUQVJUKioqKioqKioqL1xuICAgIC8vICAgICAgICB1c2VyLnVzZXJUeXBlID0gXCJGZWxsb3dcIlxuICAgIC8vICAgICAgICAvKioqKioqKioqKkRFQlVHIEVORCoqKioqKioqKi9cbiAgICAvLyAgICAgICAgLy8gcmVtb3ZlIHByZXZpb3VzIGhpZ2hsaWdodHMgaW4gY2FzZSBkYXRhIGlzIG5vdyBjb3JyZWN0XG4gICAgLy8gICAgICAgIHVuSGlnaGxpZ2h0RmllbGQoKTtcbiAgICAvL1xuICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgT3V0cHV0XCIpO1xuICAgIC8vICAgICAgICBjb25zb2xlLmxvZyh1c2VyKTtcbiAgICAvL1xuICAgIC8vICAgICAgICAvLyBpZiBldmVyeXRoaW5nIGlzIGdvb2QgbG9nIGRhdGEgYW5kIGNsb3NlLCBlbHNlIGhpZ2hsaWdodCBlcnJvclxuICAgIC8vICAgICAgICB2YXIgZXJyb3JzID0gZmFsc2U7XG4gICAgLy8gICAgICAgIGlmKHR5cGVvZih1c2VyKSA9PSBcInVuZGVmaW5lZFwiKXtcbiAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gaW5mb1wiKTtcbiAgICAvLyAgICAgICAgICAgIC8vaGVpZ2hsaWdodCBhbGxcbiAgICAvLyAgICAgICAgICAgIGhpZ2hsaWdodEVtYWlsRmllbGQoKTtcbiAgICAvLyAgICAgICAgICAgIGhpZ2hsaWdodFBhc3N3b3JkRmllbGQoKTtcbiAgICAvLyAgICAgICAgICAgIGhpZ2hsaWdodFVzZXJUeXBlRmllbGQoKTtcbiAgICAvLyAgICAgICAgICAgIGVycm9ycyA9IHRydWU7XG4gICAgLy8gICAgICAgIH1cbiAgICAvLyAgICAgICAgZWxzZSB7XG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgIGlmKHR5cGVvZih1c2VyLmVtYWlsKSA9PSBcInVuZGVmaW5lZFwiKXtcbiAgICAvLyAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJhZCBlbWFpbFwiKTtcbiAgICAvLyAgICAgICAgICAgICAgICAvL2hlaWdobGlnaHQgZW1haWxcbiAgICAvLyAgICAgICAgICAgICAgICBoaWdobGlnaHRFbWFpbEZpZWxkKCk7XG4gICAgLy8gICAgICAgICAgICAgICAgZXJyb3JzID0gdHJ1ZTtcbiAgICAvLyAgICAgICAgICAgIH1cbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgaWYodHlwZW9mKHVzZXIucGFzc3dvcmQpID09IFwidW5kZWZpbmVkXCIpe1xuICAgIC8vICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFkIHBhc3N3b3JkXCIpO1xuICAgIC8vICAgICAgICAgICAgICAgIC8vaGVpZ2hsaWdodCBwYXNzd29yZFxuICAgIC8vICAgICAgICAgICAgICAgIGhpZ2hsaWdodFBhc3N3b3JkRmllbGQoKTtcbiAgICAvLyAgICAgICAgICAgICAgICBlcnJvcnMgPSB0cnVlO1xuICAgIC8vICAgICAgICAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgICAgICAgICBpZih0eXBlb2YodXNlci51c2VyVHlwZSkgPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgLy8gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCYWQgdHlwZVwiKTtcbiAgICAvLyAgICAgICAgICAgICAgICAvL2hpZ2hsaWdodCBidXR0b25cbiAgICAvLyAgICAgICAgICAgICAgICBoaWdobGlnaHRVc2VyVHlwZUZpZWxkKCk7XG4gICAgLy8gICAgICAgICAgICAgICAgZXJyb3JzID0gdHJ1ZTtcbiAgICAvLyAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgICAgIGlmKCAhZXJyb3JzICl7XG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgIC8vIHNlbmQgdXNlciB0byBBUEkgdmlhIFNlcnZpY2VcbiAgICAvLyAgICAgICAgICAgIFVzZXIuY3JlYXRlKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgICAgIHZhciB1c2VyX2lkID0gcmVzcG9uc2UuZGF0YS5pZDtcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgICAgIGlmKCB1c2VyLnVzZXJUeXBlID09PSBcIkZlbGxvd1wiICl7XG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFyIGZlbGxvd19wb3N0ID0ge1xuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2lkOiB1c2VyX2lkXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIH07XG4gICAgLy8gICAgICAgICAgICAgICAgICAgIEZlbGxvd3MuY3JlYXRlKGZlbGxvd19wb3N0KTtcbiAgICAvLyAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgICAgZWxzZSBpZiggdXNlci51c2VyVHlwZSA9PT0gXCJDb21wYW55XCIgKXtcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgICAgICAgICB2YXIgY29tcGFueV9wb3N0ID0ge1xuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2lkOiB1c2VyX2lkXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIH07XG4gICAgLy8gICAgICAgICAgICAgICAgICAgIENvbXBhbmllcy5jcmVhdGUoY29tcGFueV9wb3N0KTtcbiAgICAvLyAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh1c2VyKTtcbiAgICAvLyAgICAgICAgICAgIH0pO1xuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xuICAgIC8vICAgICAgICB9XG4gICAgLy9cbiAgICAvLyAgICB9O1xuICAgIC8vXG4gICAgLy8gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gICAgLy8gICAgfTtcbiAgICAvL1xuICAgIC8vICAgICRzY29wZS5zd2l0Y2hUeXBlID0gZnVuY3Rpb24odXNlciwgJGV2ZW50KXtcbiAgICAvL1xuICAgIC8vICAgICAgICBjb25zb2xlLmxvZyh1c2VyKTtcbiAgICAvL1xuICAgIC8vICAgICAgICBpZiggdXNlci51c2VyVHlwZSA9PT0gXCJDb21wYW55XCIgKXtcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgalF1ZXJ5KFwib3B0aW9uQ29tcGFueVwiKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAvLyAgICAgICAgICAgIGpRdWVyeShcIm9wdGlvbkZlbGxvd1wiKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAvLyAgICAgICAgfVxuICAgIC8vICAgICAgICBlbHNlIGlmKCB1c2VyLnVzZXJUeXBlID09PSBcIkZlbGxvd1wiICl7XG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmVsbG93IHNlbGVjdGlvblwiKTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgalF1ZXJ5KFwib3B0aW9uQ29tcGFueVwiKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAvLyAgICAgICAgICAgIGpRdWVyeShcIm9wdGlvbkZlbGxvd1wiKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAvLyAgICAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgfTtcbiAgICAvL31cblxufSkoKTtcbiIsIi8qKlxuKiBDb21wYW55UHJvZmlsZUNvbnRyb2xsZXJcbiogQG5hbWVzcGFjZSBhcHAucHJvZmlsZS5jb250cm9sbGVyc1xuKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2FwcC5wcm9maWxlLmNvbnRyb2xsZXJzJylcbiAgICAuY29udHJvbGxlcignQ29tcGFueVByb2ZpbGVDb250cm9sbGVyJywgQ29tcGFueVByb2ZpbGVDb250cm9sbGVyKTtcblxuICAgIENvbXBhbnlQcm9maWxlQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvY2F0aW9uJywgJ0NvbXBhbmllcycsICdVc2VyJywgJ1RhZ3MnXTtcblxuICAgIC8qKlxuICAgICogQG5hbWVzcGFjZSBDb21wYW55UHJvZmlsZUNvbnRyb2xsZXJcbiAgICAqL1xuICAgIGZ1bmN0aW9uIENvbXBhbnlQcm9maWxlQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgQ29tcGFuaWVzLCBVc2VyLCBUYWdzKSB7XG4gICAgICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICAgICAgLy8gUHJvYmFibHkgY2FuIGhhbmRsZSB0aGlzIGluIHRoZSByb3V0ZXMgb3Igd2l0aCBtaWRkbGV3YXJlIG9mIHNvbWUga2luZFxuICAgICAgICBpZiggIVVzZXIuaXNVc2VyTG9nZ2VkSW4oKSApIHtcblxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIGN1cnJlbnQgdXNlciBpcyBhIENvbXBhbnlcbiAgICAgICAgdmFyIGN1cnJlbnRVc2VyID0gVXNlci5nZXRDdXJyZW50VXNlcigpO1xuICAgICAgICBpZiggY3VycmVudFVzZXIudXNlclR5cGUgIT09IFwiQ29tcGFueVwiICl7XG5cbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL3Byb2ZpbGVcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBDb21wYW5pZXMuZ2V0QnlVc2VySWQoY3VycmVudFVzZXIuaWQpLnN1Y2Nlc3MoZnVuY3Rpb24oY29tcGFueSl7XG5cbiAgICAgICAgICAgICRzY29wZS5jb21wYW55ID0gY29tcGFueTtcblxuICAgICAgICAgICAgVGFncy5hbGwoKS5zdWNjZXNzKGZ1bmN0aW9uKHRhZ3Mpe1xuXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICB0YWdzLmZvckVhY2goZnVuY3Rpb24odGFnKXtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRhZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHRhZy5uYW1lXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQoXCJzZWxlY3QjdGFnc1wiKS5zZWxlY3QyKHtcbiAgICAgICAgICAgICAgICAgICAgLy90YWdzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICB0b2tlblNlcGFyYXRvcnM6IFsnLCcsJyAnXVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBhY3RpdmF0ZSgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhY3RpdmF0ZWQgcHJvZmlsZSBjb250cm9sbGVyIScpO1xuICAgICAgICAgICAgLy9Qcm9maWxlLmFsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnVwZGF0ZT0gZnVuY3Rpb24oY29tcGFueSkge1xuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHRhZ3MgZnJvbSB0aGUgZm9ybVxuICAgICAgICAgICAgY29tcGFueS50YWdzID0gJChcIiN0YWdzXCIpLnZhbCgpO1xuXG4gICAgICAgICAgICAvLyBzZW5kIGNvbXBhbmllcyBpbmZvIHRvIEFQSSB2aWEgU2VydmljZVxuICAgICAgICAgICAgQ29tcGFuaWVzLnVwZGF0ZShjb21wYW55KS5zdWNjZXNzKGZ1bmN0aW9uKG5ld0NvbXBhbnlEYXRhKXtcblxuICAgICAgICAgICAgICAgIC8vICoqIFRyaWdnZXIgU3VjY2VzcyBtZXNzYWdlIGhlcmVcbiAgICAgICAgICAgICAgICBjb21wYW55ID0gbmV3Q29tcGFueURhdGE7XG5cbiAgICAgICAgICAgICAgICAvLyBoaWRlIHVwZGF0ZSBtZXNzYWdlXG4gICAgICAgICAgICAgICAgJChcIiNwcm9maWxlLXBob3RvXCIpLmZpbmQoXCIudXBsb2FkLXN0YXR1c1wiKS5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuXG4gICAgfVxuXG5cblxufSkoKTtcbiIsIi8qKlxuKiBGZWxsb3dzUHJvZmlsZUNvbnRyb2xsZXJcbiogQG5hbWVzcGFjZSBhcHAucHJvZmlsZS5jb250cm9sbGVyc1xuKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2FwcC5wcm9maWxlLmNvbnRyb2xsZXJzJylcbiAgICAuY29udHJvbGxlcignRmVsbG93c1Byb2ZpbGVDb250cm9sbGVyJywgRmVsbG93c1Byb2ZpbGVDb250cm9sbGVyKTtcblxuICAgIEZlbGxvd3NQcm9maWxlQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvY2F0aW9uJywgJ0ZlbGxvd3MnLCAnVGFncycsICdVc2VyJyBdO1xuXG4gICAgLyoqXG4gICAgKiBAbmFtZXNwYWNlIEZlbGxvd3NQcm9maWxlQ29udHJvbGxlclxuICAgICovXG4gICAgZnVuY3Rpb24gRmVsbG93c1Byb2ZpbGVDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBGZWxsb3dzLCBUYWdzLCBVc2VyICkge1xuICAgICAgICB2YXIgdm0gPSB0aGlzO1xuXG4gICAgICAgIC8vIFByb2JhYmx5IGNhbiBoYW5kbGUgdGhpcyBpbiB0aGUgcm91dGVzIG9yIHdpdGggbWlkZGxld2FyZSBvZiBzb21lIGtpbmRcbiAgICAgICAgaWYoICFVc2VyLmlzVXNlckxvZ2dlZEluKCkgKSB7XG5cbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL1wiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBjdXJyZW50IHVzZXIgaXMgYSBGZWxsb3dcbiAgICAgICAgdmFyIGN1cnJlbnRVc2VyID0gVXNlci5nZXRDdXJyZW50VXNlcigpO1xuICAgICAgICBpZiggY3VycmVudFVzZXIudXNlclR5cGUgIT09IFwiRmVsbG93XCIgKXtcblxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvcHJvZmlsZVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIEZlbGxvd3MuZ2V0QnlVc2VySWQoY3VycmVudFVzZXIuaWQpLnN1Y2Nlc3MoZnVuY3Rpb24oZmVsbG93KXtcblxuICAgICAgICAgICAgJHNjb3BlLmZlbGxvdyA9IGZlbGxvdztcblxuICAgICAgICAgICAgVGFncy5hbGwoKS5zdWNjZXNzKGZ1bmN0aW9uKHRhZ3Mpe1xuXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICB0YWdzLmZvckVhY2goZnVuY3Rpb24odGFnKXtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRhZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHRhZy5uYW1lXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyLXVpL3VpLXNlbGVjdDIvYmxvYi9tYXN0ZXIvZGVtby9hcHAuanNcblxuICAgICAgICAgICAgICAgICQoXCJzZWxlY3QjdGFnc1wiKS5zZWxlY3QyKHtcbiAgICAgICAgICAgICAgICAgICAgLy90YWdzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICB0b2tlblNlcGFyYXRvcnM6IFsnLCcsJyAnXVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBhY3RpdmF0ZSgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYWN0aXZhdGVkIHByb2ZpbGUgY29udHJvbGxlciEnKTtcbiAgICAgICAgICAgIC8vUHJvZmlsZS5hbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS51cGRhdGUgPSBmdW5jdGlvbihmZWxsb3csIGZpbGUpIHtcblxuICAgICAgICAgICAgZmVsbG93LnRhZ3MgPSAkKFwiI3RhZ3NcIikudmFsKCk7XG5cbiAgICAgICAgICAgIC8vIHNlbmQgZmVsbG93cyBpbmZvIHRvIEFQSSB2aWEgU2VydmljZVxuICAgICAgICAgICAgRmVsbG93cy51cGRhdGUoZmVsbG93KS5zdWNjZXNzKGZ1bmN0aW9uKG5ld0ZlbGxvd0RhdGEpe1xuXG4gICAgICAgICAgICAgICAgLy8gKiogVHJpZ2dlciBTdWNjZXNzIG1lc3NhZ2UgaGVyZVxuICAgICAgICAgICAgICAgIGZlbGxvdyA9IG5ld0ZlbGxvd0RhdGE7XG5cbiAgICAgICAgICAgICAgICAvLyBoaWRlIHVwZGF0ZSBtZXNzYWdlXG4gICAgICAgICAgICAgICAgJChcIiNwcm9maWxlLXBob3RvXCIpLmZpbmQoXCIudXBsb2FkLXN0YXR1c1wiKS5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgIH1cblxufSkoKTtcbiIsIi8qKlxuKiBQcm9maWxlQ29udHJvbGxlclxuKiBAbmFtZXNwYWNlIGFwcC5wcm9maWxlLmNvbnRyb2xsZXJzXG4qL1xuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgLm1vZHVsZSgnYXBwLnByb2ZpbGUuY29udHJvbGxlcnMnKVxuICAuY29udHJvbGxlcignUHJvZmlsZUNvbnRyb2xsZXInLCBQcm9maWxlQ29udHJvbGxlcik7XG5cbiAgUHJvZmlsZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2NhdGlvbicsICdVc2VyJ107XG4gIC8qKlxuICAqIEBuYW1lc3BhY2UgUHJvZmlsZUNvbnRyb2xsZXJcbiAgKi9cbiAgZnVuY3Rpb24gUHJvZmlsZUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIFVzZXIpIHtcblxuICAgICAgdmFyIHZtID0gdGhpcztcblxuICAgICAgaWYoIFVzZXIuaXNVc2VyTG9nZ2VkSW4oKSApIHtcblxuICAgICAgICAgIHZhciBjdXJyZW50VXNlciA9IFVzZXIuZ2V0Q3VycmVudFVzZXIoKTtcblxuICAgICAgICAgIC8vIHJlZGlyZWN0IHRoZSB1c2VyIGJhc2VkIG9uIHRoZWlyIHR5cGVcbiAgICAgICAgICBpZiAoY3VycmVudFVzZXIudXNlclR5cGUgPT09ICdBZG1pbicpIHtcbiAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvcHJvZmlsZS9hZG1pblwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoY3VycmVudFVzZXIudXNlclR5cGUgPT09ICdGZWxsb3cnKSB7XG4gICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL3Byb2ZpbGUvZmVsbG93XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChjdXJyZW50VXNlci51c2VyVHlwZSA9PT0gJ0NvbXBhbnknKSB7XG4gICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL3Byb2ZpbGUvY29tcGFueVwiKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNle1xuXG4gICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL1wiKTtcbiAgICAgIH1cblxuICB9XG5cblxufSkoKTtcbiIsIi8qKlxuICogRmVsbG93c1xuICogQG5hbWVzcGFjZSBhcHAuc2VydmljZXNcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5wcm9maWxlLnNlcnZpY2VzJylcbiAgICAgICAgLnNlcnZpY2UoJ1RhZ3MnLCBUYWdzKTtcblxuICAgIFRhZ3MuJGluamVjdCA9IFsnJGh0dHAnLCAnQ09ORklHJ107XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlIFRhZ3NcbiAgICAgKiBAcmV0dXJucyB7U2VydmljZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBUYWdzKCRodHRwLCBDT05GSUcpIHtcblxuICAgICAgICB2YXIgcm9vdFVybCA9IENPTkZJRy5TRVJWSUNFX1VSTDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWxsOiBhbGwsXG4gICAgICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgICAgIC8vY3JlYXRlOiBjcmVhdGUsXG4gICAgICAgICAgICAvL3VwZGF0ZTogdXBkYXRlLFxuICAgICAgICAgICAgLy9kZXN0cm95OiBkZXN0cm95XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG5hbWUgYWxsXG4gICAgICAgICAqIEBkZXNjIGdldCBhbGwgdGhlIGZlbGxvd3NcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGFsbCgpIHtcblxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChyb290VXJsICsgJy9hcGkvdjEvdGFncycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lIGdldFxuICAgICAgICAgKiBAZGVzYyBnZXQgb25lIGZlbGxvd1xuICAgICAgICAgKiBAZGVzYyBnZXQgb25lIGZlbGxvd1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0KGlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQocm9vdFVybCArICcvYXBpL3YxL3RhZ3MvJyArIGlkKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lIGNyZWF0ZVxuICAgICAgICAgKiBAZGVzYyBjcmVlYXRlIGEgbmV3IGZlbGxvdyByZWNvcmRcbiAgICAgICAgICovXG4gICAgICAgIC8vZnVuY3Rpb24gY3JlYXRlKGZlbGxvdykge1xuICAgICAgICAvLyAgICByZXR1cm4gJGh0dHAucG9zdChyb290VXJsICsgJy9hcGkvdjEvZmVsbG93cy8nLCBmZWxsb3cpO1xuICAgICAgICAvL31cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG5hbWUgdXBkYXRlXG4gICAgICAgICAqIEBkZXNjIHVwZGF0ZXMgYSBmZWxsb3cgcmVjb3JkXG4gICAgICAgICAqL1xuICAgICAgICAvL2Z1bmN0aW9uIHVwZGF0ZShmZWxsb3csIGlkKSB7XG4gICAgICAgIC8vICAgIHJldHVybiAkaHR0cC5wdXQocm9vdFVybCArICcvYXBpL3YxL2ZlbGxvd3MvJyArIGlkLCBmZWxsb3cpO1xuICAgICAgICAvL31cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG5hbWUgZGVzdHJveVxuICAgICAgICAgKiBAZGVzYyBkZXN0cm95IGEgZmVsbG93IHJlY29yZFxuICAgICAgICAgKi9cbiAgICAgICAgLy9mdW5jdGlvbiBkZXN0cm95KGlkKSB7XG4gICAgICAgIC8vICAgIHJldHVybiAkaHR0cC5kZWxldGUocm9vdFVybCArICcvYXBpL3YxL2ZlbGxvd3MvJyArIGlkKTtcbiAgICAgICAgLy99XG4gICAgfVxuXG59KSgpO1xuIiwiLyoqXG4gKiBQcm9maWxlXG4gKiBAbmFtZXNwYWNlIGFwcC5wcm9maWxlLnNlcnZpY2VzXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYXBwLnByb2ZpbGUuc2VydmljZXMnKVxuICAgIC5mYWN0b3J5KCdVc2VyJywgVXNlcik7XG5cbiAgVXNlci4kaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyRjb29raWVTdG9yZScsICckaHR0cCcsICdDT05GSUcnXTtcblxuICAvKipcbiAgICogQG5hbWVzcGFjZSBVc2VyXG4gICAqIEByZXR1cm5zIHtTZXJ2aWNlfVxuICAgKi9cbiAgZnVuY3Rpb24gVXNlcigkcm9vdFNjb3BlLCAkY29va2llU3RvcmUsICRodHRwLCBDT05GSUcpIHtcblxuICAgICAgdmFyIHJvb3RVcmwgPSBDT05GSUcuU0VSVklDRV9VUkw7XG5cbiAgICAgIC8vIFdpbGwgaG9sZCBpbmZvIGZvciB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyXG4gICAgICB2YXIgY3VycmVudFVzZXIgPSB7fTtcblxuICAgICAgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIoKSB7XG5cbiAgICAgICAgICByZXR1cm4gY3VycmVudFVzZXI7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNldEN1cnJlbnRVc2VyKHVzZXIpIHtcblxuICAgICAgICAgIGN1cnJlbnRVc2VyID0gdXNlcjtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0Vm90ZXMoIHVzZXJfaWQgKXtcblxuICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQocm9vdFVybCArICcvYXBpL3YxL3VzZXJzLycgKyB1c2VyX2lkICsgJy92b3RlcycgKTtcbiAgICAgIH1cblxuXG4gICAgICAvKipcbiAgICAgICAqIEBuYW1lIGxvZ2luXG4gICAgICAgKiBAZGVzYyBsb2dpbiBhIG5ldyB1c2VyIHJlY29yZFxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBsb2dpbih1c2VyKSB7XG4gICAgICAgICAgcmV0dXJuICRodHRwLnBvc3Qocm9vdFVybCArICcvYXBpL3YxL3VzZXJzL2xvZ2luJywgdXNlcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG5cbiAgICAgICAgICAvL2FsbDogYWxsLFxuICAgICAgICAgIC8vZ2V0OiBnZXQsXG4gICAgICAgICAgZ2V0Vm90ZXM6IGdldFZvdGVzLFxuICAgICAgICAgIGNyZWF0ZTogY3JlYXRlLFxuICAgICAgICAgIGxvZ2luOiBsb2dpbixcbiAgICAgICAgICAvL3VwZGF0ZTogdXBkYXRlLFxuICAgICAgICAgIC8vZGVzdHJveTogZGVzdHJveVxuICAgICAgICAgIFNldENyZWRlbnRpYWxzOiBTZXRDcmVkZW50aWFscyxcbiAgICAgICAgICBDbGVhckNyZWRlbnRpYWxzOiBDbGVhckNyZWRlbnRpYWxzLFxuICAgICAgICAgIGdldEN1cnJlbnRVc2VyOiBnZXRDdXJyZW50VXNlcixcbiAgICAgICAgICBzZXRDdXJyZW50VXNlcjogc2V0Q3VycmVudFVzZXIsXG4gICAgICAgICAgaXNVc2VyTG9nZ2VkSW46IGlzVXNlckxvZ2dlZEluXG4gICAgICB9O1xuXG5cbiAgICAgIC8qKlxuICAgICAgICogQG5hbWUgYWxsXG4gICAgICAgKiBAZGVzYyBnZXQgYWxsIHRoZSBjb21wYW5pZXNcbiAgICAgICAqL1xuICAgICAgLy9mdW5jdGlvbiBhbGwoKSB7XG4gICAgICAvL1xuICAgICAgLy8gICAgcmV0dXJuIFtdO1xuICAgICAgLy9cbiAgICAgIC8vICAgIC8vcmV0dXJuICRodHRwLmdldChyb290VXJsICsgJy9hcGkvdjEvY29tcGFuaWVzLycpO1xuICAgICAgLy99XG5cbiAgICAgIC8qKlxuICAgICAgICogQG5hbWUgZ2V0XG4gICAgICAgKiBAZGVzYyBnZXQganVzdCBvbmUgY29tcGFueVxuICAgICAgICovXG4gICAgICAvL2Z1bmN0aW9uIGdldChpZCkge1xuICAgICAgLy8gICAgcmV0dXJuICRodHRwLmdldChyb290VXJsICsgJy9hcGkvdjEvdXNlcnMvJyArIHBhcnNlSW50KGlkKSApO1xuICAgICAgLy99XG5cbiAgICAgIC8qKlxuICAgICAgICogQG5hbWUgY3JlYXRlXG4gICAgICAgKiBAZGVzYyBjcmVhdGUgYSBuZXcgZmVsbG93IHJlY29yZFxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBjcmVhdGUodXNlcikge1xuICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KHJvb3RVcmwgKyAnL2FwaS92MS91c2Vycy9jcmVhdGUnLCB1c2VyKTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBAbmFtZSBkZXN0cm95XG4gICAgICAgKiBAZGVzYyBkZXN0cm95IGEgdXNlciByZWNvcmRcbiAgICAgICAqL1xuICAgICAgLy9mdW5jdGlvbiBkZXN0cm95KGlkKSB7XG4gICAgICAvLyAgICByZXR1cm4gJGh0dHAuZGVsZXRlKHJvb3RVcmwgKyByb290VXJsICsgJy9hcGkvdjEvdXNlcnMvJyArIGlkKTtcbiAgICAgIC8vfVxuXG4gICAgICBmdW5jdGlvbiBpc1VzZXJMb2dnZWRJbigpe1xuXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhjdXJyZW50VXNlcik7XG4gICAgICAgICAgaWYoIE9iamVjdC5rZXlzKGN1cnJlbnRVc2VyKS5sZW5ndGggPiAwICl7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gU2V0Q3JlZGVudGlhbHMoaWQsIHVzZXJuYW1lLCB1c2VyVHlwZSkge1xuXG4gICAgICAgICAgdmFyIGF1dGhkYXRhID0gQmFzZTY0LmVuY29kZShpZCArICc6JyArIHVzZXJuYW1lICsgJzonICsgdXNlclR5cGUpO1xuXG4gICAgICAgICAgY3VycmVudFVzZXIgPSB7XG4gICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICB1c2VyVHlwZTogdXNlclR5cGUsXG4gICAgICAgICAgICAgIGF1dGhkYXRhOiBhdXRoZGF0YVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAkY29va2llU3RvcmUucHV0KCdnbG9iYWxzJywgY3VycmVudFVzZXIpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBDbGVhckNyZWRlbnRpYWxzKCkge1xuXG4gICAgICAgICAgJHJvb3RTY29wZS5nbG9iYWxzID0ge307XG4gICAgICAgICAgJGNvb2tpZVN0b3JlLnJlbW92ZSgnZ2xvYmFscycpO1xuICAgICAgfVxuXG4gIH1cblxuICAvLyBCYXNlNjQgZW5jb2Rpbmcgc2VydmljZSB1c2VkIGJ5IEF1dGhlbnRpY2F0aW9uU2VydmljZVxuICB2YXIgQmFzZTY0ID0ge1xuXG4gICAga2V5U3RyOiAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nLFxuXG4gICAgZW5jb2RlOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgIHZhciBvdXRwdXQgPSBcIlwiO1xuICAgICAgdmFyIGNocjEsIGNocjIsIGNocjMgPSBcIlwiO1xuICAgICAgdmFyIGVuYzEsIGVuYzIsIGVuYzMsIGVuYzQgPSBcIlwiO1xuICAgICAgdmFyIGkgPSAwO1xuXG4gICAgICBkbyB7XG4gICAgICAgIGNocjEgPSBpbnB1dC5jaGFyQ29kZUF0KGkrKyk7XG4gICAgICAgIGNocjIgPSBpbnB1dC5jaGFyQ29kZUF0KGkrKyk7XG4gICAgICAgIGNocjMgPSBpbnB1dC5jaGFyQ29kZUF0KGkrKyk7XG5cbiAgICAgICAgZW5jMSA9IGNocjEgPj4gMjtcbiAgICAgICAgZW5jMiA9ICgoY2hyMSAmIDMpIDw8IDQpIHwgKGNocjIgPj4gNCk7XG4gICAgICAgIGVuYzMgPSAoKGNocjIgJiAxNSkgPDwgMikgfCAoY2hyMyA+PiA2KTtcbiAgICAgICAgZW5jNCA9IGNocjMgJiA2MztcblxuICAgICAgICBpZiAoaXNOYU4oY2hyMikpIHtcbiAgICAgICAgICBlbmMzID0gZW5jNCA9IDY0O1xuICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKGNocjMpKSB7XG4gICAgICAgICAgZW5jNCA9IDY0O1xuICAgICAgICB9XG5cbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0ICtcbiAgICAgICAgICB0aGlzLmtleVN0ci5jaGFyQXQoZW5jMSkgK1xuICAgICAgICAgIHRoaXMua2V5U3RyLmNoYXJBdChlbmMyKSArXG4gICAgICAgICAgdGhpcy5rZXlTdHIuY2hhckF0KGVuYzMpICtcbiAgICAgICAgICB0aGlzLmtleVN0ci5jaGFyQXQoZW5jNCk7XG4gICAgICAgIGNocjEgPSBjaHIyID0gY2hyMyA9IFwiXCI7XG4gICAgICAgIGVuYzEgPSBlbmMyID0gZW5jMyA9IGVuYzQgPSBcIlwiO1xuICAgICAgfSB3aGlsZSAoaSA8IGlucHV0Lmxlbmd0aCk7XG5cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfSxcblxuICAgIGRlY29kZTogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICB2YXIgb3V0cHV0ID0gXCJcIjtcbiAgICAgIHZhciBjaHIxLCBjaHIyLCBjaHIzID0gXCJcIjtcbiAgICAgIHZhciBlbmMxLCBlbmMyLCBlbmMzLCBlbmM0ID0gXCJcIjtcbiAgICAgIHZhciBpID0gMDtcblxuICAgICAgLy8gcmVtb3ZlIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBBLVosIGEteiwgMC05LCArLCAvLCBvciA9XG4gICAgICB2YXIgYmFzZTY0dGVzdCA9IC9bXkEtWmEtejAtOVxcK1xcL1xcPV0vZztcbiAgICAgIGlmIChiYXNlNjR0ZXN0LmV4ZWMoaW5wdXQpKSB7XG4gICAgICAgIHdpbmRvdy5hbGVydChcIlRoZXJlIHdlcmUgaW52YWxpZCBiYXNlNjQgY2hhcmFjdGVycyBpbiB0aGUgaW5wdXQgdGV4dC5cXG5cIiArXG4gICAgICAgICAgICBcIlZhbGlkIGJhc2U2NCBjaGFyYWN0ZXJzIGFyZSBBLVosIGEteiwgMC05LCAnKycsICcvJyxhbmQgJz0nXFxuXCIgK1xuICAgICAgICAgICAgXCJFeHBlY3QgZXJyb3JzIGluIGRlY29kaW5nLlwiKTtcbiAgICAgIH1cbiAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTlcXCtcXC9cXD1dL2csIFwiXCIpO1xuXG4gICAgICBkbyB7XG4gICAgICAgIGVuYzEgPSB0aGlzLmtleVN0ci5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTtcbiAgICAgICAgZW5jMiA9IHRoaXMua2V5U3RyLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xuICAgICAgICBlbmMzID0gdGhpcy5rZXlTdHIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XG4gICAgICAgIGVuYzQgPSB0aGlzLmtleVN0ci5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTtcblxuICAgICAgICBjaHIxID0gKGVuYzEgPDwgMikgfCAoZW5jMiA+PiA0KTtcbiAgICAgICAgY2hyMiA9ICgoZW5jMiAmIDE1KSA8PCA0KSB8IChlbmMzID4+IDIpO1xuICAgICAgICBjaHIzID0gKChlbmMzICYgMykgPDwgNikgfCBlbmM0O1xuXG4gICAgICAgIG91dHB1dCA9IG91dHB1dCArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyMSk7XG5cbiAgICAgICAgaWYgKGVuYzMgIT0gNjQpIHtcbiAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbmM0ICE9IDY0KSB7XG4gICAgICAgICAgb3V0cHV0ID0gb3V0cHV0ICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaHIzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNocjEgPSBjaHIyID0gY2hyMyA9IFwiXCI7XG4gICAgICAgIGVuYzEgPSBlbmMyID0gZW5jMyA9IGVuYzQgPSBcIlwiO1xuXG4gICAgICB9IHdoaWxlIChpIDwgaW5wdXQubGVuZ3RoKTtcblxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG4gIH07XG5cbn0pKCk7XG4iLCIvKipcbiAqIFZvdGVzQ29udHJvbGxlclxuICogQG5hbWVzcGFjZSBhcHAudm90ZXMuY29udHJvbGxlcnNcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoICdhcHAudm90ZXMuY29udHJvbGxlcnMnIClcbiAgICAgICAgLmNvbnRyb2xsZXIoICdWb3Rlc0NvbnRyb2xsZXInLCBWb3Rlc0NvbnRyb2xsZXIgKTtcblxuICAgIFZvdGVzQ29udHJvbGxlci4kaW5qZWN0ID0gWyAnJHNjb3BlJywgJyRsb2NhdGlvbicsICdVc2VyJywgJ1ZvdGVzJyBdO1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2UgVm90ZUNvbnRyb2xsZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBWb3Rlc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIFVzZXIsIFZvdGVzKSB7XG5cbiAgICAgICAgdmFyIHZtID0gdGhpcztcblxuICAgICAgICBpZiggVXNlci5pc1VzZXJMb2dnZWRJbigpICkge1xuXG4gICAgICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBVc2VyLmdldEN1cnJlbnRVc2VyKCk7XG5cbiAgICAgICAgICAgIC8vIEdldCB0aGUgY29tcGFuaWVzIHZvdGVkIG9uIGJ5IHRoZSBjdXJyZW50IGxvZ2dlZCBpbiB1c2VyXG4gICAgICAgICAgICBDb21wYW55Vm90ZXMuZ2V0KCBjdXJyZW50VXNlci5pZCApXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyggZnVuY3Rpb24oIHZvdGVzICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIHZvdGVzICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jb21wYW55X3ZvdGVzID0gdm90ZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgRmVsbG93Vm90ZXMuZ2V0KCBjdXJyZW50VXNlci5pZCApXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyggZnVuY3Rpb24oIHZvdGVzICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggdm90ZXMgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZmVsbG93X3ZvdGVzID0gdm90ZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvXCIpO1xuICAgICAgICB9XG5cblxuXG4gICAgfVxuXG5cbn0pKCk7XG4iLCIvKipcbiAqIFZvdGVzXG4gKiBAbmFtZXNwYWNlIGFwcC52b3Rlcy5zZXJ2aWNlc1xuICovXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnZvdGVzLnNlcnZpY2VzJylcbiAgICAgICAgLnNlcnZpY2UoJ1ZvdGVzJywgVm90ZXMpO1xuXG4gICAgVm90ZXMuJGluamVjdCA9IFsnJGh0dHAnLCAnQ09ORklHJ107XG5cblxuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2UgQ29tcGFueVZvdGVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gVm90ZXMoJGh0dHAsIENPTkZJRykge1xuXG4gICAgICAgIHZhciByb290VXJsID0gQ09ORklHLlNFUlZJQ0VfVVJMO1xuXG4gICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgICAgIGdldFZvdGVzRm9yOiBnZXRWb3Rlc0ZvcixcbiAgICAgICAgICAgIGdldFZvdGVzQ2FzdDogZ2V0Vm90ZXNDYXN0LFxuICAgICAgICAgICAgY3JlYXRlOiBjcmVhdGUsXG4gICAgICAgICAgICBkZXN0cm95OiBkZXN0cm95XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lIGdldCB2b3Rlc1xuICAgICAgICAgKiBAZGVzYyBnZXQgdGhlIHZvdGVzIGNhc3QgZm9yIGEgdXNlclxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0Vm90ZXNGb3IodXNlcl9pZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHJvb3RVcmwgKyAnL2FwaS92MS92b3Rlcy9mb3IvJyArIHVzZXJfaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lIGdldCB2b3Rlc1xuICAgICAgICAgKiBAZGVzYyBnZXQgdGhlIHZvdGVzIGNhc3QgYnkgYSB1c2VyXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRWb3Rlc0Nhc3QodXNlcl9pZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHJvb3RVcmwgKyAnL2FwaS92MS92b3Rlcy9ieS8nICsgdXNlcl9pZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG5hbWUgY3JlYXRlXG4gICAgICAgICAqIEBkZXNjIGNhc3QgYSB2b3RlIGZvciBhIHVzZXJcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZSggdm90ZXJfaWQsIHZvdGVlX2lkICkge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyggdm90ZXJfaWQgKyBcIiBcIiArIHZvdGVlX2lkICk7XG5cbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KHJvb3RVcmwgKyAnL2FwaS92MS92b3Rlcy8nLCB7XG5cbiAgICAgICAgICAgICAgICB2b3Rlcl9pZDogdm90ZXJfaWQsXG4gICAgICAgICAgICAgICAgdm90ZWVfaWQ6IHZvdGVlX2lkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbmFtZSBkZXN0cm95XG4gICAgICAgICAqIEBkZXNjIGRlc3Ryb3kgYSB2b3RlIHJlY29yZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZGVzdHJveShpZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZGVsZXRlKHJvb3RVcmwgKyAnL2FwaS92MS92b3Rlcy8nICsgaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn0pKCk7XG5cbiIsIi8qISA3LjMuNCAqL1xuIXdpbmRvdy5YTUxIdHRwUmVxdWVzdHx8d2luZG93LkZpbGVBUEkmJkZpbGVBUEkuc2hvdWxkTG9hZHx8KHdpbmRvdy5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlcj1mdW5jdGlvbihhKXtyZXR1cm4gZnVuY3Rpb24oYixjKXtpZihcIl9fc2V0WEhSX1wiPT09Yil7dmFyIGQ9Yyh0aGlzKTtkIGluc3RhbmNlb2YgRnVuY3Rpb24mJmQodGhpcyl9ZWxzZSBhLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19KHdpbmRvdy5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlcikpO3ZhciBuZ0ZpbGVVcGxvYWQ9YW5ndWxhci5tb2R1bGUoXCJuZ0ZpbGVVcGxvYWRcIixbXSk7bmdGaWxlVXBsb2FkLnZlcnNpb249XCI3LjMuNFwiLG5nRmlsZVVwbG9hZC5zZXJ2aWNlKFwiVXBsb2FkQmFzZVwiLFtcIiRodHRwXCIsXCIkcVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChkKXtmdW5jdGlvbiBnKGEpe2oubm90aWZ5JiZqLm5vdGlmeShhKSxrLnByb2dyZXNzRnVuYyYmYyhmdW5jdGlvbigpe2sucHJvZ3Jlc3NGdW5jKGEpfSl9ZnVuY3Rpb24gaChhKXtyZXR1cm4gbnVsbCE9ZC5fc3RhcnQmJmY/e2xvYWRlZDphLmxvYWRlZCtkLl9zdGFydCx0b3RhbDpkLl9maWxlLnNpemUsdHlwZTphLnR5cGUsY29uZmlnOmQsbGVuZ3RoQ29tcHV0YWJsZTohMCx0YXJnZXQ6YS50YXJnZXR9OmF9ZnVuY3Rpb24gaSgpe2EoZCkudGhlbihmdW5jdGlvbihhKXtkLl9jaHVua1NpemUmJiFkLl9maW5pc2hlZD8oZyh7bG9hZGVkOmQuX2VuZCx0b3RhbDpkLl9maWxlLnNpemUsY29uZmlnOmQsdHlwZTpcInByb2dyZXNzXCJ9KSxlLnVwbG9hZChkKSk6KGQuX2ZpbmlzaGVkJiZkZWxldGUgZC5fZmluaXNoZWQsai5yZXNvbHZlKGEpKX0sZnVuY3Rpb24oYSl7ai5yZWplY3QoYSl9LGZ1bmN0aW9uKGEpe2oubm90aWZ5KGEpfSl9ZC5tZXRob2Q9ZC5tZXRob2R8fFwiUE9TVFwiLGQuaGVhZGVycz1kLmhlYWRlcnN8fHt9O3ZhciBqPWQuX2RlZmVycmVkPWQuX2RlZmVycmVkfHxiLmRlZmVyKCksaz1qLnByb21pc2U7cmV0dXJuIGQuaGVhZGVycy5fX3NldFhIUl89ZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oYSl7YSYmKGQuX19YSFI9YSxkLnhockZuJiZkLnhockZuKGEpLGEudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLGZ1bmN0aW9uKGEpe2EuY29uZmlnPWQsZyhoKGEpKX0sITEpLGEudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZnVuY3Rpb24oYSl7YS5sZW5ndGhDb21wdXRhYmxlJiYoYS5jb25maWc9ZCxnKGgoYSkpKX0sITEpKX19LGY/ZC5fY2h1bmtTaXplJiZkLl9lbmQmJiFkLl9maW5pc2hlZD8oZC5fc3RhcnQ9ZC5fZW5kLGQuX2VuZCs9ZC5fY2h1bmtTaXplLGkoKSk6ZC5yZXN1bWVTaXplVXJsP2EuZ2V0KGQucmVzdW1lU2l6ZVVybCkudGhlbihmdW5jdGlvbihhKXtkLl9zdGFydD1kLnJlc3VtZVNpemVSZXNwb25zZVJlYWRlcj9kLnJlc3VtZVNpemVSZXNwb25zZVJlYWRlcihhLmRhdGEpOnBhcnNlSW50KChudWxsPT1hLmRhdGEuc2l6ZT9hLmRhdGE6YS5kYXRhLnNpemUpLnRvU3RyaW5nKCkpLGQuX2NodW5rU2l6ZSYmKGQuX2VuZD1kLl9zdGFydCtkLl9jaHVua1NpemUpLGkoKX0sZnVuY3Rpb24oYSl7dGhyb3cgYX0pOmQucmVzdW1lU2l6ZT9kLnJlc3VtZVNpemUoKS50aGVuKGZ1bmN0aW9uKGEpe2QuX3N0YXJ0PWEsaSgpfSxmdW5jdGlvbihhKXt0aHJvdyBhfSk6aSgpOmkoKSxrLnN1Y2Nlc3M9ZnVuY3Rpb24oYSl7cmV0dXJuIGsudGhlbihmdW5jdGlvbihiKXthKGIuZGF0YSxiLnN0YXR1cyxiLmhlYWRlcnMsZCl9KSxrfSxrLmVycm9yPWZ1bmN0aW9uKGEpe3JldHVybiBrLnRoZW4obnVsbCxmdW5jdGlvbihiKXthKGIuZGF0YSxiLnN0YXR1cyxiLmhlYWRlcnMsZCl9KSxrfSxrLnByb2dyZXNzPWZ1bmN0aW9uKGEpe3JldHVybiBrLnByb2dyZXNzRnVuYz1hLGsudGhlbihudWxsLG51bGwsZnVuY3Rpb24oYil7YShiKX0pLGt9LGsuYWJvcnQ9ay5wYXVzZT1mdW5jdGlvbigpe3JldHVybiBkLl9fWEhSJiZjKGZ1bmN0aW9uKCl7ZC5fX1hIUi5hYm9ydCgpfSksa30say54aHI9ZnVuY3Rpb24oYSl7cmV0dXJuIGQueGhyRm49ZnVuY3Rpb24oYil7cmV0dXJuIGZ1bmN0aW9uKCl7YiYmYi5hcHBseShrLGFyZ3VtZW50cyksYS5hcHBseShrLGFyZ3VtZW50cyl9fShkLnhockZuKSxrfSxrfXZhciBlPXRoaXMsZj13aW5kb3cuQmxvYiYmKG5ldyBCbG9iKS5zbGljZTt0aGlzLnVwbG9hZD1mdW5jdGlvbihhKXtmdW5jdGlvbiBiKGMsZCxlKXtpZih2b2lkIDAhPT1kKWlmKGFuZ3VsYXIuaXNEYXRlKGQpJiYoZD1kLnRvSVNPU3RyaW5nKCkpLGFuZ3VsYXIuaXNTdHJpbmcoZCkpYy5hcHBlbmQoZSxkKTtlbHNlIGlmKFwiZm9ybVwiPT09YS5zZW5kRmllbGRzQXMpaWYoYW5ndWxhci5pc09iamVjdChkKSlmb3IodmFyIGYgaW4gZClkLmhhc093blByb3BlcnR5KGYpJiZiKGMsZFtmXSxlK1wiW1wiK2YrXCJdXCIpO2Vsc2UgYy5hcHBlbmQoZSxkKTtlbHNlIGQ9YW5ndWxhci5pc1N0cmluZyhkKT9kOmFuZ3VsYXIudG9Kc29uKGQpLFwianNvbi1ibG9iXCI9PT1hLnNlbmRGaWVsZHNBcz9jLmFwcGVuZChlLG5ldyBCbG9iKFtkXSx7dHlwZTpcImFwcGxpY2F0aW9uL2pzb25cIn0pKTpjLmFwcGVuZChlLGQpfWZ1bmN0aW9uIGMoYSl7cmV0dXJuIGEgaW5zdGFuY2VvZiBCbG9ifHxhLmZsYXNoSWQmJmEubmFtZSYmYS5zaXplfWZ1bmN0aW9uIGcoYixkLGUpe2lmKGMoZCkpe2lmKGEuX2ZpbGU9YS5fZmlsZXx8ZCxudWxsIT1hLl9zdGFydCYmZil7YS5fZW5kJiZhLl9lbmQ+PWQuc2l6ZSYmKGEuX2ZpbmlzaGVkPSEwLGEuX2VuZD1kLnNpemUpO3ZhciBoPWQuc2xpY2UoYS5fc3RhcnQsYS5fZW5kfHxkLnNpemUpO2gubmFtZT1kLm5hbWUsZD1oLGEuX2NodW5rU2l6ZSYmKGIuYXBwZW5kKFwiY2h1bmtTaXplXCIsYS5fZW5kLWEuX3N0YXJ0KSxiLmFwcGVuZChcImNodW5rTnVtYmVyXCIsTWF0aC5mbG9vcihhLl9zdGFydC9hLl9jaHVua1NpemUpKSxiLmFwcGVuZChcInRvdGFsU2l6ZVwiLGEuX2ZpbGUuc2l6ZSkpfWIuYXBwZW5kKGUsZCxkLmZpbGVOYW1lfHxkLm5hbWUpfWVsc2V7aWYoIWFuZ3VsYXIuaXNPYmplY3QoZCkpdGhyb3dcIkV4cGVjdGVkIGZpbGUgb2JqZWN0IGluIFVwbG9hZC51cGxvYWQgZmlsZSBvcHRpb246IFwiK2QudG9TdHJpbmcoKTtmb3IodmFyIGkgaW4gZClpZihkLmhhc093blByb3BlcnR5KGkpKXt2YXIgaj1pLnNwbGl0KFwiLFwiKTtqWzFdJiYoZFtpXS5maWxlTmFtZT1qWzFdLnJlcGxhY2UoL15cXHMrfFxccyskL2csXCJcIikpLGcoYixkW2ldLGpbMF0pfX19cmV0dXJuIGEuX2NodW5rU2l6ZT1lLnRyYW5zbGF0ZVNjYWxhcnMoYS5yZXN1bWVDaHVua1NpemUpLGEuX2NodW5rU2l6ZT1hLl9jaHVua1NpemU/cGFyc2VJbnQoYS5fY2h1bmtTaXplLnRvU3RyaW5nKCkpOm51bGwsYS5oZWFkZXJzPWEuaGVhZGVyc3x8e30sYS5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdPXZvaWQgMCxhLnRyYW5zZm9ybVJlcXVlc3Q9YS50cmFuc2Zvcm1SZXF1ZXN0P2FuZ3VsYXIuaXNBcnJheShhLnRyYW5zZm9ybVJlcXVlc3QpP2EudHJhbnNmb3JtUmVxdWVzdDpbYS50cmFuc2Zvcm1SZXF1ZXN0XTpbXSxhLnRyYW5zZm9ybVJlcXVlc3QucHVzaChmdW5jdGlvbihjKXt2YXIgZCxlPW5ldyBGb3JtRGF0YSxmPXt9O2ZvcihkIGluIGEuZmllbGRzKWEuZmllbGRzLmhhc093blByb3BlcnR5KGQpJiYoZltkXT1hLmZpZWxkc1tkXSk7YyYmKGYuZGF0YT1jKTtmb3IoZCBpbiBmKWlmKGYuaGFzT3duUHJvcGVydHkoZCkpe3ZhciBoPWZbZF07YS5mb3JtRGF0YUFwcGVuZGVyP2EuZm9ybURhdGFBcHBlbmRlcihlLGQsaCk6YihlLGgsZCl9aWYobnVsbCE9YS5maWxlKWlmKGFuZ3VsYXIuaXNBcnJheShhLmZpbGUpKWZvcih2YXIgaT0wO2k8YS5maWxlLmxlbmd0aDtpKyspZyhlLGEuZmlsZVtpXSxcImZpbGVcIik7ZWxzZSBnKGUsYS5maWxlLFwiZmlsZVwiKTtyZXR1cm4gZX0pLGQoYSl9LHRoaXMuaHR0cD1mdW5jdGlvbihiKXtyZXR1cm4gYi50cmFuc2Zvcm1SZXF1ZXN0PWIudHJhbnNmb3JtUmVxdWVzdHx8ZnVuY3Rpb24oYil7cmV0dXJuIHdpbmRvdy5BcnJheUJ1ZmZlciYmYiBpbnN0YW5jZW9mIHdpbmRvdy5BcnJheUJ1ZmZlcnx8YiBpbnN0YW5jZW9mIEJsb2I/YjphLmRlZmF1bHRzLnRyYW5zZm9ybVJlcXVlc3RbMF0uYXBwbHkodGhpcyxhcmd1bWVudHMpfSxiLl9jaHVua1NpemU9ZS50cmFuc2xhdGVTY2FsYXJzKGIucmVzdW1lQ2h1bmtTaXplKSxiLl9jaHVua1NpemU9Yi5fY2h1bmtTaXplP3BhcnNlSW50KGIuX2NodW5rU2l6ZS50b1N0cmluZygpKTpudWxsLGQoYil9LHRoaXMudHJhbnNsYXRlU2NhbGFycz1mdW5jdGlvbihhKXtpZihhbmd1bGFyLmlzU3RyaW5nKGEpKXtpZihhLnNlYXJjaCgva2IvaSk9PT1hLmxlbmd0aC0yKXJldHVybiBwYXJzZUZsb2F0KDFlMyphLnN1YnN0cmluZygwLGEubGVuZ3RoLTIpKTtpZihhLnNlYXJjaCgvbWIvaSk9PT1hLmxlbmd0aC0yKXJldHVybiBwYXJzZUZsb2F0KDFlNiphLnN1YnN0cmluZygwLGEubGVuZ3RoLTIpKTtpZihhLnNlYXJjaCgvZ2IvaSk9PT1hLmxlbmd0aC0yKXJldHVybiBwYXJzZUZsb2F0KDFlOSphLnN1YnN0cmluZygwLGEubGVuZ3RoLTIpKTtpZihhLnNlYXJjaCgvYi9pKT09PWEubGVuZ3RoLTEpcmV0dXJuIHBhcnNlRmxvYXQoYS5zdWJzdHJpbmcoMCxhLmxlbmd0aC0xKSk7aWYoYS5zZWFyY2goL3MvaSk9PT1hLmxlbmd0aC0xKXJldHVybiBwYXJzZUZsb2F0KGEuc3Vic3RyaW5nKDAsYS5sZW5ndGgtMSkpO2lmKGEuc2VhcmNoKC9tL2kpPT09YS5sZW5ndGgtMSlyZXR1cm4gcGFyc2VGbG9hdCg2MCphLnN1YnN0cmluZygwLGEubGVuZ3RoLTEpKTtpZihhLnNlYXJjaCgvaC9pKT09PWEubGVuZ3RoLTEpcmV0dXJuIHBhcnNlRmxvYXQoMzYwMCphLnN1YnN0cmluZygwLGEubGVuZ3RoLTEpKX1yZXR1cm4gYX0sdGhpcy5zZXREZWZhdWx0cz1mdW5jdGlvbihhKXt0aGlzLmRlZmF1bHRzPWF8fHt9fSx0aGlzLmRlZmF1bHRzPXt9LHRoaXMudmVyc2lvbj1uZ0ZpbGVVcGxvYWQudmVyc2lvbn1dKSxuZ0ZpbGVVcGxvYWQuc2VydmljZShcIlVwbG9hZFwiLFtcIiRwYXJzZVwiLFwiJHRpbWVvdXRcIixcIiRjb21waWxlXCIsXCJVcGxvYWRSZXNpemVcIixmdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1kO3JldHVybiBlLmdldEF0dHJXaXRoRGVmYXVsdHM9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gbnVsbCE9YVtiXT9hW2JdOm51bGw9PWUuZGVmYXVsdHNbYl0/ZS5kZWZhdWx0c1tiXTplLmRlZmF1bHRzW2JdLnRvU3RyaW5nKCl9LGUuYXR0ckdldHRlcj1mdW5jdGlvbihiLGMsZCxlKXtpZighZClyZXR1cm4gdGhpcy5nZXRBdHRyV2l0aERlZmF1bHRzKGMsYik7dHJ5e3JldHVybiBlP2EodGhpcy5nZXRBdHRyV2l0aERlZmF1bHRzKGMsYikpKGQsZSk6YSh0aGlzLmdldEF0dHJXaXRoRGVmYXVsdHMoYyxiKSkoZCl9Y2F0Y2goZil7aWYoYi5zZWFyY2goL21pbnxtYXh8cGF0dGVybi9pKSlyZXR1cm4gdGhpcy5nZXRBdHRyV2l0aERlZmF1bHRzKGMsYik7dGhyb3cgZn19LGUudXBkYXRlTW9kZWw9ZnVuY3Rpb24oYyxkLGYsZyxoLGksail7ZnVuY3Rpb24gaygpe3ZhciBqPWgmJmgubGVuZ3RoP2hbMF06bnVsbDtpZihjKXt2YXIgaz0hZS5hdHRyR2V0dGVyKFwibmdmTXVsdGlwbGVcIixkLGYpJiYhZS5hdHRyR2V0dGVyKFwibXVsdGlwbGVcIixkKSYmIW87YShlLmF0dHJHZXR0ZXIoXCJuZ01vZGVsXCIsZCkpLmFzc2lnbihmLGs/ajpoKX12YXIgbD1lLmF0dHJHZXR0ZXIoXCJuZ2ZNb2RlbFwiLGQpO2wmJmEobCkuYXNzaWduKGYsaCksZyYmYShnKShmLHskZmlsZXM6aCwkZmlsZTpqLCRuZXdGaWxlczptLCRkdXBsaWNhdGVGaWxlczpuLCRldmVudDppfSksYihmdW5jdGlvbigpe30pfWZ1bmN0aW9uIGwoYSxiKXt2YXIgYz1lLmF0dHJHZXR0ZXIoXCJuZ2ZSZXNpemVcIixkLGYpO2lmKCFjfHwhZS5pc1Jlc2l6ZVN1cHBvcnRlZCgpKXJldHVybiBiKCk7Zm9yKHZhciBnPWEubGVuZ3RoLGg9ZnVuY3Rpb24oKXtnLS0sMD09PWcmJmIoKX0saT1mdW5jdGlvbihiKXtyZXR1cm4gZnVuY3Rpb24oYyl7YS5zcGxpY2UoYiwxLGMpLGgoKX19LGo9ZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGIpe2goKSxhLiRlcnJvcj1cInJlc2l6ZVwiLGEuJGVycm9yUGFyYW09KGI/KGIubWVzc2FnZT9iLm1lc3NhZ2U6YikrXCI6IFwiOlwiXCIpKyhhJiZhLm5hbWUpfX0saz0wO2s8YS5sZW5ndGg7aysrKXt2YXIgbD1hW2tdO2wuJGVycm9yfHwwIT09bC50eXBlLmluZGV4T2YoXCJpbWFnZVwiKT9oKCk6ZS5yZXNpemUobCxjLndpZHRoLGMuaGVpZ2h0LGMucXVhbGl0eSkudGhlbihpKGspLGoobCkpfX12YXIgbT1oLG49W10sbz1lLmF0dHJHZXR0ZXIoXCJuZ2ZLZWVwXCIsZCxmKTtpZihvPT09ITApe2lmKCFofHwhaC5sZW5ndGgpcmV0dXJuO3ZhciBwPShjJiZjLiRtb2RlbFZhbHVlfHxkLiQkbmdmUHJldkZpbGVzfHxbXSkuc2xpY2UoMCkscT0hMTtpZihlLmF0dHJHZXR0ZXIoXCJuZ2ZLZWVwRGlzdGluY3RcIixkLGYpPT09ITApe2Zvcih2YXIgcj1wLmxlbmd0aCxzPTA7czxoLmxlbmd0aDtzKyspe2Zvcih2YXIgdD0wO3I+dDt0KyspaWYoaFtzXS5uYW1lPT09cFt0XS5uYW1lKXtuLnB1c2goaFtzXSk7YnJlYWt9dD09PXImJihwLnB1c2goaFtzXSkscT0hMCl9aWYoIXEpcmV0dXJuO2g9cH1lbHNlIGg9cC5jb25jYXQoaCl9ZC4kJG5nZlByZXZGaWxlcz1oLGo/aygpOmUudmFsaWRhdGUoaCxjLGQsZixlLmF0dHJHZXR0ZXIoXCJuZ2ZWYWxpZGF0ZUxhdGVyXCIsZCksZnVuY3Rpb24oKXtsKGgsZnVuY3Rpb24oKXtiKGZ1bmN0aW9uKCl7aygpfSl9KX0pfSxlfV0pLG5nRmlsZVVwbG9hZC5kaXJlY3RpdmUoXCJuZ2ZTZWxlY3RcIixbXCIkcGFyc2VcIixcIiR0aW1lb3V0XCIsXCIkY29tcGlsZVwiLFwiVXBsb2FkXCIsZnVuY3Rpb24oYSxiLGMsZCl7ZnVuY3Rpb24gZShhKXt2YXIgYj1hLm1hdGNoKC9BbmRyb2lkW15cXGRdKihcXGQrKVxcLihcXGQrKS8pO2lmKGImJmIubGVuZ3RoPjIpe3ZhciBjPWQuZGVmYXVsdHMuYW5kcm9pZEZpeE1pbm9yVmVyc2lvbnx8NDtyZXR1cm4gcGFyc2VJbnQoYlsxXSk8NHx8cGFyc2VJbnQoYlsxXSk9PT1jJiZwYXJzZUludChiWzJdKTxjfXJldHVybi0xPT09YS5pbmRleE9mKFwiQ2hyb21lXCIpJiYvLipXaW5kb3dzLipTYWZhcmkuKi8udGVzdChhKX1mdW5jdGlvbiBmKGEsYixjLGQsZixoLGksail7ZnVuY3Rpb24gaygpe3JldHVyblwiaW5wdXRcIj09PWJbMF0udGFnTmFtZS50b0xvd2VyQ2FzZSgpJiZjLnR5cGUmJlwiZmlsZVwiPT09Yy50eXBlLnRvTG93ZXJDYXNlKCl9ZnVuY3Rpb24gbCgpe3JldHVybiB0KFwibmdmQ2hhbmdlXCIpfHx0KFwibmdmU2VsZWN0XCIpfWZ1bmN0aW9uIG0oYil7Zm9yKHZhciBlPWIuX19maWxlc198fGIudGFyZ2V0JiZiLnRhcmdldC5maWxlcyxmPVtdLGc9MDtnPGUubGVuZ3RoO2crKylmLnB1c2goZVtnXSk7ai51cGRhdGVNb2RlbChkLGMsYSxsKCksZi5sZW5ndGg/ZjpudWxsLGIpfWZ1bmN0aW9uIG4oYSl7aWYoYiE9PWEpZm9yKHZhciBjPTA7YzxiWzBdLmF0dHJpYnV0ZXMubGVuZ3RoO2MrKyl7dmFyIGQ9YlswXS5hdHRyaWJ1dGVzW2NdO1widHlwZVwiIT09ZC5uYW1lJiZcImNsYXNzXCIhPT1kLm5hbWUmJlwiaWRcIiE9PWQubmFtZSYmXCJzdHlsZVwiIT09ZC5uYW1lJiYoKG51bGw9PWQudmFsdWV8fFwiXCI9PT1kLnZhbHVlKSYmKFwicmVxdWlyZWRcIj09PWQubmFtZSYmKGQudmFsdWU9XCJyZXF1aXJlZFwiKSxcIm11bHRpcGxlXCI9PT1kLm5hbWUmJihkLnZhbHVlPVwibXVsdGlwbGVcIikpLGEuYXR0cihkLm5hbWUsZC52YWx1ZSkpfX1mdW5jdGlvbiBvKCl7aWYoaygpKXJldHVybiBiO3ZhciBhPWFuZ3VsYXIuZWxlbWVudCgnPGlucHV0IHR5cGU9XCJmaWxlXCI+Jyk7cmV0dXJuIG4oYSksYS5jc3MoXCJ2aXNpYmlsaXR5XCIsXCJoaWRkZW5cIikuY3NzKFwicG9zaXRpb25cIixcImFic29sdXRlXCIpLmNzcyhcIm92ZXJmbG93XCIsXCJoaWRkZW5cIikuY3NzKFwid2lkdGhcIixcIjBweFwiKS5jc3MoXCJoZWlnaHRcIixcIjBweFwiKS5jc3MoXCJib3JkZXJcIixcIm5vbmVcIikuY3NzKFwibWFyZ2luXCIsXCIwcHhcIikuY3NzKFwicGFkZGluZ1wiLFwiMHB4XCIpLmF0dHIoXCJ0YWJpbmRleFwiLFwiLTFcIiksZy5wdXNoKHtlbDpiLHJlZjphfSksZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhWzBdKSxhfWZ1bmN0aW9uIHAoYyl7aWYoYi5hdHRyKFwiZGlzYWJsZWRcIil8fHQoXCJuZ2ZTZWxlY3REaXNhYmxlZFwiLGEpKXJldHVybiExO3ZhciBkPXEoYyk7cmV0dXJuIG51bGwhPWQ/ZDoocihjKSxlKG5hdmlnYXRvci51c2VyQWdlbnQpP3NldFRpbWVvdXQoZnVuY3Rpb24oKXt3WzBdLmNsaWNrKCl9LDApOndbMF0uY2xpY2soKSwhMSl9ZnVuY3Rpb24gcShhKXt2YXIgYj1hLmNoYW5nZWRUb3VjaGVzfHxhLm9yaWdpbmFsRXZlbnQmJmEub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlcztpZihcInRvdWNoc3RhcnRcIj09PWEudHlwZSlyZXR1cm4gdj1iP2JbMF0uY2xpZW50WTowLCEwO2lmKGEuc3RvcFByb3BhZ2F0aW9uKCksYS5wcmV2ZW50RGVmYXVsdCgpLFwidG91Y2hlbmRcIj09PWEudHlwZSl7dmFyIGM9Yj9iWzBdLmNsaWVudFk6MDtpZihNYXRoLmFicyhjLXYpPjIwKXJldHVybiExfX1mdW5jdGlvbiByKGIpe3cudmFsKCkmJih3LnZhbChudWxsKSxqLnVwZGF0ZU1vZGVsKGQsYyxhLGwoKSxudWxsLGIsITApKX1mdW5jdGlvbiBzKGEpe2lmKHcmJiF3LmF0dHIoXCJfX25nZl9pZTEwX0ZpeF9cIikpe2lmKCF3WzBdLnBhcmVudE5vZGUpcmV0dXJuIHZvaWQodz1udWxsKTthLnByZXZlbnREZWZhdWx0KCksYS5zdG9wUHJvcGFnYXRpb24oKSx3LnVuYmluZChcImNsaWNrXCIpO3ZhciBiPXcuY2xvbmUoKTtyZXR1cm4gdy5yZXBsYWNlV2l0aChiKSx3PWIsdy5hdHRyKFwiX19uZ2ZfaWUxMF9GaXhfXCIsXCJ0cnVlXCIpLHcuYmluZChcImNoYW5nZVwiLG0pLHcuYmluZChcImNsaWNrXCIscyksd1swXS5jbGljaygpLCExfXcucmVtb3ZlQXR0cihcIl9fbmdmX2llMTBfRml4X1wiKX12YXIgdD1mdW5jdGlvbihhLGIpe3JldHVybiBqLmF0dHJHZXR0ZXIoYSxjLGIpfSx1PVtdO3UucHVzaChhLiR3YXRjaCh0KFwibmdmTXVsdGlwbGVcIiksZnVuY3Rpb24oKXt3LmF0dHIoXCJtdWx0aXBsZVwiLHQoXCJuZ2ZNdWx0aXBsZVwiLGEpKX0pKSx1LnB1c2goYS4kd2F0Y2godChcIm5nZkNhcHR1cmVcIiksZnVuY3Rpb24oKXt3LmF0dHIoXCJjYXB0dXJlXCIsdChcIm5nZkNhcHR1cmVcIixhKSl9KSksYy4kb2JzZXJ2ZShcImFjY2VwdFwiLGZ1bmN0aW9uKCl7dy5hdHRyKFwiYWNjZXB0XCIsdChcImFjY2VwdFwiKSl9KSx1LnB1c2goZnVuY3Rpb24oKXtjLiQkb2JzZXJ2ZXJzJiZkZWxldGUgYy4kJG9ic2VydmVycy5hY2NlcHR9KTt2YXIgdj0wLHc9YjtrKCl8fCh3PW8oKSksdy5iaW5kKFwiY2hhbmdlXCIsbSksaygpP2IuYmluZChcImNsaWNrXCIscik6Yi5iaW5kKFwiY2xpY2sgdG91Y2hzdGFydCB0b3VjaGVuZFwiLHApLGoucmVnaXN0ZXJWYWxpZGF0b3JzKGQsdyxjLGEpLC0xIT09bmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIk1TSUUgMTBcIikmJncuYmluZChcImNsaWNrXCIscyksYS4kb24oXCIkZGVzdHJveVwiLGZ1bmN0aW9uKCl7aygpfHx3LnJlbW92ZSgpLGFuZ3VsYXIuZm9yRWFjaCh1LGZ1bmN0aW9uKGEpe2EoKX0pfSksaChmdW5jdGlvbigpe2Zvcih2YXIgYT0wO2E8Zy5sZW5ndGg7YSsrKXt2YXIgYj1nW2FdO2RvY3VtZW50LmJvZHkuY29udGFpbnMoYi5lbFswXSl8fChnLnNwbGljZShhLDEpLGIucmVmLnJlbW92ZSgpKX19KSx3aW5kb3cuRmlsZUFQSSYmd2luZG93LkZpbGVBUEkubmdmRml4SUUmJndpbmRvdy5GaWxlQVBJLm5nZkZpeElFKGIsdyxtKX12YXIgZz1bXTtyZXR1cm57cmVzdHJpY3Q6XCJBRUNcIixyZXF1aXJlOlwiP25nTW9kZWxcIixsaW5rOmZ1bmN0aW9uKGUsZyxoLGkpe2YoZSxnLGgsaSxhLGIsYyxkKX19fV0pLGZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShhKXtyZXR1cm5cImltZ1wiPT09YS50YWdOYW1lLnRvTG93ZXJDYXNlKCk/XCJpbWFnZVwiOlwiYXVkaW9cIj09PWEudGFnTmFtZS50b0xvd2VyQ2FzZSgpP1wiYXVkaW9cIjpcInZpZGVvXCI9PT1hLnRhZ05hbWUudG9Mb3dlckNhc2UoKT9cInZpZGVvXCI6Ly4vfWZ1bmN0aW9uIGIoYixjLGQsZSxmLGcsaCxpKXtmdW5jdGlvbiBqKGEpe3ZhciBnPWIuYXR0ckdldHRlcihcIm5nZk5vT2JqZWN0VXJsXCIsZixkKTtiLmRhdGFVcmwoYSxnKVtcImZpbmFsbHlcIl0oZnVuY3Rpb24oKXtjKGZ1bmN0aW9uKCl7dmFyIGI9KGc/YS5kYXRhVXJsOmEuYmxvYlVybCl8fGEuZGF0YVVybDtpP2UuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiLFwidXJsKCdcIisoYnx8XCJcIikrXCInKVwiKTplLmF0dHIoXCJzcmNcIixiKSxiP2UucmVtb3ZlQ2xhc3MoXCJuZ2YtaGlkZVwiKTplLmFkZENsYXNzKFwibmdmLWhpZGVcIil9KX0pfWMoZnVuY3Rpb24oKXt2YXIgYz1kLiR3YXRjaChmW2ddLGZ1bmN0aW9uKGMpe3ZhciBkPWg7cmV0dXJuXCJuZ2ZUaHVtYm5haWxcIiE9PWd8fGR8fChkPXt3aWR0aDplWzBdLmNsaWVudFdpZHRoLGhlaWdodDplWzBdLmNsaWVudEhlaWdodH0pLGFuZ3VsYXIuaXNTdHJpbmcoYyk/KGUucmVtb3ZlQ2xhc3MoXCJuZ2YtaGlkZVwiKSxpP2UuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiLFwidXJsKCdcIitjK1wiJylcIik6ZS5hdHRyKFwic3JjXCIsYykpOnZvaWQoIWN8fCFjLnR5cGV8fDAhPT1jLnR5cGUuc2VhcmNoKGEoZVswXSkpfHxpJiYwIT09Yy50eXBlLmluZGV4T2YoXCJpbWFnZVwiKT9lLmFkZENsYXNzKFwibmdmLWhpZGVcIik6ZCYmYi5pc1Jlc2l6ZVN1cHBvcnRlZCgpP2IucmVzaXplKGMsZC53aWR0aCxkLmhlaWdodCxkLnF1YWxpdHkpLnRoZW4oZnVuY3Rpb24oYSl7aihhKX0sZnVuY3Rpb24oYSl7dGhyb3cgYX0pOmooYykpfSk7ZC4kb24oXCIkZGVzdHJveVwiLGZ1bmN0aW9uKCl7YygpfSl9KX1uZ0ZpbGVVcGxvYWQuc2VydmljZShcIlVwbG9hZERhdGFVcmxcIixbXCJVcGxvYWRCYXNlXCIsXCIkdGltZW91dFwiLFwiJHFcIixmdW5jdGlvbihhLGIsYyl7dmFyIGQ9YTtyZXR1cm4gZC5kYXRhVXJsPWZ1bmN0aW9uKGEsZCl7aWYoZCYmbnVsbCE9YS5kYXRhVXJsfHwhZCYmbnVsbCE9YS5ibG9iVXJsKXt2YXIgZT1jLmRlZmVyKCk7cmV0dXJuIGIoZnVuY3Rpb24oKXtlLnJlc29sdmUoZD9hLmRhdGFVcmw6YS5ibG9iVXJsKX0pLGUucHJvbWlzZX12YXIgZj1kP2EuJG5nZkRhdGFVcmxQcm9taXNlOmEuJG5nZkJsb2JVcmxQcm9taXNlO2lmKGYpcmV0dXJuIGY7dmFyIGc9Yy5kZWZlcigpO3JldHVybiBiKGZ1bmN0aW9uKCl7aWYod2luZG93LkZpbGVSZWFkZXImJmEmJighd2luZG93LkZpbGVBUEl8fC0xPT09bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRSA4XCIpfHxhLnNpemU8MmU0KSYmKCF3aW5kb3cuRmlsZUFQSXx8LTE9PT1uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFIDlcIil8fGEuc2l6ZTw0ZTYpKXt2YXIgYz13aW5kb3cuVVJMfHx3aW5kb3cud2Via2l0VVJMO2lmKGMmJmMuY3JlYXRlT2JqZWN0VVJMJiYhZCl7dmFyIGU7dHJ5e2U9Yy5jcmVhdGVPYmplY3RVUkwoYSl9Y2F0Y2goZil7cmV0dXJuIHZvaWQgYihmdW5jdGlvbigpe2EuYmxvYlVybD1cIlwiLGcucmVqZWN0KCl9KX1iKGZ1bmN0aW9uKCl7YS5ibG9iVXJsPWUsZSYmZy5yZXNvbHZlKGUpfSl9ZWxzZXt2YXIgaD1uZXcgRmlsZVJlYWRlcjtoLm9ubG9hZD1mdW5jdGlvbihjKXtiKGZ1bmN0aW9uKCl7YS5kYXRhVXJsPWMudGFyZ2V0LnJlc3VsdCxnLnJlc29sdmUoYy50YXJnZXQucmVzdWx0KX0pfSxoLm9uZXJyb3I9ZnVuY3Rpb24oKXtiKGZ1bmN0aW9uKCl7YS5kYXRhVXJsPVwiXCIsZy5yZWplY3QoKX0pfSxoLnJlYWRBc0RhdGFVUkwoYSl9fWVsc2UgYihmdW5jdGlvbigpe2FbZD9cImRhdGFVcmxcIjpcImJsb2JVcmxcIl09XCJcIixnLnJlamVjdCgpfSl9KSxmPWQ/YS4kbmdmRGF0YVVybFByb21pc2U9Zy5wcm9taXNlOmEuJG5nZkJsb2JVcmxQcm9taXNlPWcucHJvbWlzZSxmW1wiZmluYWxseVwiXShmdW5jdGlvbigpe2RlbGV0ZSBhW2Q/XCIkbmdmRGF0YVVybFByb21pc2VcIjpcIiRuZ2ZCbG9iVXJsUHJvbWlzZVwiXX0pLGZ9LGR9XSk7dmFyIGM9YW5ndWxhci5lbGVtZW50KFwiPHN0eWxlPi5uZ2YtaGlkZXtkaXNwbGF5Om5vbmUgIWltcG9ydGFudH08L3N0eWxlPlwiKTtkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoY1swXSksbmdGaWxlVXBsb2FkLmRpcmVjdGl2ZShcIm5nZlNyY1wiLFtcIlVwbG9hZFwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihhLGMpe3JldHVybntyZXN0cmljdDpcIkFFXCIsbGluazpmdW5jdGlvbihkLGUsZil7YihhLGMsZCxlLGYsXCJuZ2ZTcmNcIixhLmF0dHJHZXR0ZXIoXCJuZ2ZSZXNpemVcIixmLGQpLCExKX19fV0pLG5nRmlsZVVwbG9hZC5kaXJlY3RpdmUoXCJuZ2ZCYWNrZ3JvdW5kXCIsW1wiVXBsb2FkXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGEsYyl7cmV0dXJue3Jlc3RyaWN0OlwiQUVcIixsaW5rOmZ1bmN0aW9uKGQsZSxmKXtiKGEsYyxkLGUsZixcIm5nZkJhY2tncm91bmRcIixhLmF0dHJHZXR0ZXIoXCJuZ2ZSZXNpemVcIixmLGQpLCEwKX19fV0pLG5nRmlsZVVwbG9hZC5kaXJlY3RpdmUoXCJuZ2ZUaHVtYm5haWxcIixbXCJVcGxvYWRcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oYSxjKXtyZXR1cm57cmVzdHJpY3Q6XCJBRVwiLGxpbms6ZnVuY3Rpb24oZCxlLGYpe3ZhciBnPWEuYXR0ckdldHRlcihcIm5nZlNpemVcIixmLGQpO2IoYSxjLGQsZSxmLFwibmdmVGh1bWJuYWlsXCIsZyxhLmF0dHJHZXR0ZXIoXCJuZ2ZBc0JhY2tncm91bmRcIixmLGQpKX19fV0pfSgpLG5nRmlsZVVwbG9hZC5zZXJ2aWNlKFwiVXBsb2FkVmFsaWRhdGVcIixbXCJVcGxvYWREYXRhVXJsXCIsXCIkcVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChhKXtpZihhLmxlbmd0aD4yJiZcIi9cIj09PWFbMF0mJlwiL1wiPT09YVthLmxlbmd0aC0xXSlyZXR1cm4gYS5zdWJzdHJpbmcoMSxhLmxlbmd0aC0xKTt2YXIgYj1hLnNwbGl0KFwiLFwiKSxjPVwiXCI7aWYoYi5sZW5ndGg+MSlmb3IodmFyIGU9MDtlPGIubGVuZ3RoO2UrKyljKz1cIihcIitkKGJbZV0pK1wiKVwiLGU8Yi5sZW5ndGgtMSYmKGMrPVwifFwiKTtlbHNlIDA9PT1hLmluZGV4T2YoXCIuXCIpJiYoYT1cIipcIithKSxjPVwiXlwiK2EucmVwbGFjZShuZXcgUmVnRXhwKFwiWy5cXFxcXFxcXCsqP1xcXFxbXFxcXF5cXFxcXSQoKXt9PSE8Pnw6XFxcXC1dXCIsXCJnXCIpLFwiXFxcXCQmXCIpK1wiJFwiLGM9Yy5yZXBsYWNlKC9cXFxcXFwqL2csXCIuKlwiKS5yZXBsYWNlKC9cXFxcXFw/L2csXCIuXCIpO3JldHVybiBjfXZhciBlPWE7cmV0dXJuIGUucmVnaXN0ZXJWYWxpZGF0b3JzPWZ1bmN0aW9uKGEsYixjLGQpe2Z1bmN0aW9uIGYoYSl7YW5ndWxhci5mb3JFYWNoKGEuJG5nZlZhbGlkYXRpb25zLGZ1bmN0aW9uKGIpe2EuJHNldFZhbGlkaXR5KGIubmFtZSxiLnZhbGlkKX0pfWEmJihhLiRuZ2ZWYWxpZGF0aW9ucz1bXSxhLiRmb3JtYXR0ZXJzLnB1c2goZnVuY3Rpb24oZyl7cmV0dXJuIGUuYXR0ckdldHRlcihcIm5nZlZhbGlkYXRlTGF0ZXJcIixjLGQpfHwhYS4kJG5nZlZhbGlkYXRlZD8oZS52YWxpZGF0ZShnLGEsYyxkLCExLGZ1bmN0aW9uKCl7ZihhKSxhLiQkbmdmVmFsaWRhdGVkPSExfSksZyYmMD09PWcubGVuZ3RoJiYoZz1udWxsKSwhYnx8bnVsbCE9ZyYmMCE9PWcubGVuZ3RofHxiLnZhbCgpJiZiLnZhbChudWxsKSk6KGYoYSksYS4kJG5nZlZhbGlkYXRlZD0hMSksZ30pKX0sZS52YWxpZGF0ZVBhdHRlcm49ZnVuY3Rpb24oYSxiKXtpZighYilyZXR1cm4hMDt2YXIgYz1uZXcgUmVnRXhwKGQoYiksXCJnaVwiKTtyZXR1cm4gbnVsbCE9YS50eXBlJiZjLnRlc3QoYS50eXBlLnRvTG93ZXJDYXNlKCkpfHxudWxsIT1hLm5hbWUmJmMudGVzdChhLm5hbWUudG9Mb3dlckNhc2UoKSl9LGUudmFsaWRhdGU9ZnVuY3Rpb24oYSxiLGMsZCxmLGcpe2Z1bmN0aW9uIGgoYyxkLGUpe2lmKGEpe2Zvcih2YXIgZj1cIm5nZlwiK2NbMF0udG9VcHBlckNhc2UoKStjLnN1YnN0cigxKSxnPWEubGVuZ3RoLGg9bnVsbDtnLS07KXt2YXIgaT1hW2ddLGs9aihmLHskZmlsZTppfSk7bnVsbD09ayYmKGs9ZChqKFwibmdmVmFsaWRhdGVcIil8fHt9KSxoPW51bGw9PWg/ITA6aCksbnVsbCE9ayYmKGUoaSxrKXx8KGkuJGVycm9yPWMsaS4kZXJyb3JQYXJhbT1rLGEuc3BsaWNlKGcsMSksaD0hMSkpfW51bGwhPT1oJiZiLiRuZ2ZWYWxpZGF0aW9ucy5wdXNoKHtuYW1lOmMsdmFsaWQ6aH0pfX1mdW5jdGlvbiBpKGMsZCxlLGYsaCl7aWYoYSl7dmFyIGk9MCxsPSExLG09XCJuZ2ZcIitjWzBdLnRvVXBwZXJDYXNlKCkrYy5zdWJzdHIoMSk7YT12b2lkIDA9PT1hLmxlbmd0aD9bYV06YSxhbmd1bGFyLmZvckVhY2goYSxmdW5jdGlvbihhKXtpZigwIT09YS50eXBlLnNlYXJjaChlKSlyZXR1cm4hMDt2YXIgbj1qKG0seyRmaWxlOmF9KXx8ZChqKFwibmdmVmFsaWRhdGVcIix7JGZpbGU6YX0pfHx7fSk7biYmKGsrKyxpKyssZihhLG4pLnRoZW4oZnVuY3Rpb24oYil7aChiLG4pfHwoYS4kZXJyb3I9YyxhLiRlcnJvclBhcmFtPW4sbD0hMCl9LGZ1bmN0aW9uKCl7aihcIm5nZlZhbGlkYXRlRm9yY2VcIix7JGZpbGU6YX0pJiYoYS4kZXJyb3I9YyxhLiRlcnJvclBhcmFtPW4sbD0hMCl9KVtcImZpbmFsbHlcIl0oZnVuY3Rpb24oKXtrLS0saS0tLGl8fGIuJG5nZlZhbGlkYXRpb25zLnB1c2goe25hbWU6Yyx2YWxpZDohbH0pLGt8fGcuY2FsbChiLGIuJG5nZlZhbGlkYXRpb25zKX0pKX0pfX1iPWJ8fHt9LGIuJG5nZlZhbGlkYXRpb25zPWIuJG5nZlZhbGlkYXRpb25zfHxbXSxhbmd1bGFyLmZvckVhY2goYi4kbmdmVmFsaWRhdGlvbnMsZnVuY3Rpb24oYSl7YS52YWxpZD0hMH0pO3ZhciBqPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGUuYXR0ckdldHRlcihhLGMsZCxiKX07aWYoZilyZXR1cm4gdm9pZCBnLmNhbGwoYik7aWYoYi4kJG5nZlZhbGlkYXRlZD0hMCxudWxsPT1hfHwwPT09YS5sZW5ndGgpcmV0dXJuIHZvaWQgZy5jYWxsKGIpO2lmKGE9dm9pZCAwPT09YS5sZW5ndGg/W2FdOmEuc2xpY2UoMCksaChcInBhdHRlcm5cIixmdW5jdGlvbihhKXtyZXR1cm4gYS5wYXR0ZXJufSxlLnZhbGlkYXRlUGF0dGVybiksaChcIm1pblNpemVcIixmdW5jdGlvbihhKXtyZXR1cm4gYS5zaXplJiZhLnNpemUubWlufSxmdW5jdGlvbihhLGIpe3JldHVybiBhLnNpemU+PWUudHJhbnNsYXRlU2NhbGFycyhiKX0pLGgoXCJtYXhTaXplXCIsZnVuY3Rpb24oYSl7cmV0dXJuIGEuc2l6ZSYmYS5zaXplLm1heH0sZnVuY3Rpb24oYSxiKXtyZXR1cm4gYS5zaXplPD1lLnRyYW5zbGF0ZVNjYWxhcnMoYil9KSxoKFwidmFsaWRhdGVGblwiLGZ1bmN0aW9uKCl7cmV0dXJuIG51bGx9LGZ1bmN0aW9uKGEsYil7cmV0dXJuIGI9PT0hMHx8bnVsbD09PWJ8fFwiXCI9PT1ifSksIWEubGVuZ3RoKXJldHVybiB2b2lkIGcuY2FsbChiLGIuJG5nZlZhbGlkYXRpb25zKTt2YXIgaz0wO2koXCJtYXhIZWlnaHRcIixmdW5jdGlvbihhKXtyZXR1cm4gYS5oZWlnaHQmJmEuaGVpZ2h0Lm1heH0sL2ltYWdlLyx0aGlzLmltYWdlRGltZW5zaW9ucyxmdW5jdGlvbihhLGIpe3JldHVybiBhLmhlaWdodDw9Yn0pLGkoXCJtaW5IZWlnaHRcIixmdW5jdGlvbihhKXtyZXR1cm4gYS5oZWlnaHQmJmEuaGVpZ2h0Lm1pbn0sL2ltYWdlLyx0aGlzLmltYWdlRGltZW5zaW9ucyxmdW5jdGlvbihhLGIpe3JldHVybiBhLmhlaWdodD49Yn0pLGkoXCJtYXhXaWR0aFwiLGZ1bmN0aW9uKGEpe3JldHVybiBhLndpZHRoJiZhLndpZHRoLm1heH0sL2ltYWdlLyx0aGlzLmltYWdlRGltZW5zaW9ucyxmdW5jdGlvbihhLGIpe3JldHVybiBhLndpZHRoPD1ifSksaShcIm1pbldpZHRoXCIsZnVuY3Rpb24oYSl7cmV0dXJuIGEud2lkdGgmJmEud2lkdGgubWlufSwvaW1hZ2UvLHRoaXMuaW1hZ2VEaW1lbnNpb25zLGZ1bmN0aW9uKGEsYil7cmV0dXJuIGEud2lkdGg+PWJ9KSxpKFwicmF0aW9cIixmdW5jdGlvbihhKXtyZXR1cm4gYS5yYXRpb30sL2ltYWdlLyx0aGlzLmltYWdlRGltZW5zaW9ucyxmdW5jdGlvbihhLGIpe2Zvcih2YXIgYz1iLnRvU3RyaW5nKCkuc3BsaXQoXCIsXCIpLGQ9ITEsZT0wO2U8Yy5sZW5ndGg7ZSsrKXt2YXIgZj1jW2VdLGc9Zi5zZWFyY2goL3gvaSk7Zj1nPi0xP3BhcnNlRmxvYXQoZi5zdWJzdHJpbmcoMCxnKSkvcGFyc2VGbG9hdChmLnN1YnN0cmluZyhnKzEpKTpwYXJzZUZsb2F0KGYpLE1hdGguYWJzKGEud2lkdGgvYS5oZWlnaHQtZik8MWUtNCYmKGQ9ITApfXJldHVybiBkfSksaShcIm1heER1cmF0aW9uXCIsZnVuY3Rpb24oYSl7cmV0dXJuIGEuZHVyYXRpb24mJmEuZHVyYXRpb24ubWF4fSwvYXVkaW98dmlkZW8vLHRoaXMubWVkaWFEdXJhdGlvbixmdW5jdGlvbihhLGIpe3JldHVybiBhPD1lLnRyYW5zbGF0ZVNjYWxhcnMoYil9KSxpKFwibWluRHVyYXRpb25cIixmdW5jdGlvbihhKXtyZXR1cm4gYS5kdXJhdGlvbiYmYS5kdXJhdGlvbi5taW59LC9hdWRpb3x2aWRlby8sdGhpcy5tZWRpYUR1cmF0aW9uLGZ1bmN0aW9uKGEsYil7cmV0dXJuIGE+PWUudHJhbnNsYXRlU2NhbGFycyhiKX0pLGkoXCJ2YWxpZGF0ZUFzeW5jRm5cIixmdW5jdGlvbigpe3JldHVybiBudWxsfSwvLi8sZnVuY3Rpb24oYSxiKXtyZXR1cm4gYn0sZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT0hMHx8bnVsbD09PWF8fFwiXCI9PT1hfSksa3x8Zy5jYWxsKGIsYi4kbmdmVmFsaWRhdGlvbnMpfSxlLmltYWdlRGltZW5zaW9ucz1mdW5jdGlvbihhKXtpZihhLndpZHRoJiZhLmhlaWdodCl7dmFyIGQ9Yi5kZWZlcigpO3JldHVybiBjKGZ1bmN0aW9uKCl7ZC5yZXNvbHZlKHt3aWR0aDphLndpZHRoLGhlaWdodDphLmhlaWdodH0pfSksZC5wcm9taXNlfWlmKGEuJG5nZkRpbWVuc2lvblByb21pc2UpcmV0dXJuIGEuJG5nZkRpbWVuc2lvblByb21pc2U7dmFyIGY9Yi5kZWZlcigpO3JldHVybiBjKGZ1bmN0aW9uKCl7cmV0dXJuIDAhPT1hLnR5cGUuaW5kZXhPZihcImltYWdlXCIpP3ZvaWQgZi5yZWplY3QoXCJub3QgaW1hZ2VcIik6dm9pZCBlLmRhdGFVcmwoYSkudGhlbihmdW5jdGlvbihiKXtmdW5jdGlvbiBkKCl7dmFyIGI9aFswXS5jbGllbnRXaWR0aCxjPWhbMF0uY2xpZW50SGVpZ2h0O2gucmVtb3ZlKCksYS53aWR0aD1iLGEuaGVpZ2h0PWMsZi5yZXNvbHZlKHt3aWR0aDpiLGhlaWdodDpjfSl9ZnVuY3Rpb24gZSgpe2gucmVtb3ZlKCksZi5yZWplY3QoXCJsb2FkIGVycm9yXCIpfWZ1bmN0aW9uIGcoKXtjKGZ1bmN0aW9uKCl7aFswXS5wYXJlbnROb2RlJiYoaFswXS5jbGllbnRXaWR0aD9kKCk6aT4xMD9lKCk6ZygpKX0sMWUzKX12YXIgaD1hbmd1bGFyLmVsZW1lbnQoXCI8aW1nPlwiKS5hdHRyKFwic3JjXCIsYikuY3NzKFwidmlzaWJpbGl0eVwiLFwiaGlkZGVuXCIpLmNzcyhcInBvc2l0aW9uXCIsXCJmaXhlZFwiKTtoLm9uKFwibG9hZFwiLGQpLGgub24oXCJlcnJvclwiLGUpO3ZhciBpPTA7ZygpLGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF0pLmFwcGVuZChoKX0sZnVuY3Rpb24oKXtmLnJlamVjdChcImxvYWQgZXJyb3JcIil9KX0pLGEuJG5nZkRpbWVuc2lvblByb21pc2U9Zi5wcm9taXNlLGEuJG5nZkRpbWVuc2lvblByb21pc2VbXCJmaW5hbGx5XCJdKGZ1bmN0aW9uKCl7ZGVsZXRlIGEuJG5nZkRpbWVuc2lvblByb21pc2V9KSxhLiRuZ2ZEaW1lbnNpb25Qcm9taXNlfSxlLm1lZGlhRHVyYXRpb249ZnVuY3Rpb24oYSl7aWYoYS5kdXJhdGlvbil7dmFyIGQ9Yi5kZWZlcigpO3JldHVybiBjKGZ1bmN0aW9uKCl7ZC5yZXNvbHZlKGEuZHVyYXRpb24pfSksZC5wcm9taXNlfWlmKGEuJG5nZkR1cmF0aW9uUHJvbWlzZSlyZXR1cm4gYS4kbmdmRHVyYXRpb25Qcm9taXNlO3ZhciBmPWIuZGVmZXIoKTtyZXR1cm4gYyhmdW5jdGlvbigpe3JldHVybiAwIT09YS50eXBlLmluZGV4T2YoXCJhdWRpb1wiKSYmMCE9PWEudHlwZS5pbmRleE9mKFwidmlkZW9cIik/dm9pZCBmLnJlamVjdChcIm5vdCBtZWRpYVwiKTp2b2lkIGUuZGF0YVVybChhKS50aGVuKGZ1bmN0aW9uKGIpe2Z1bmN0aW9uIGQoKXt2YXIgYj1oWzBdLmR1cmF0aW9uO2EuZHVyYXRpb249YixoLnJlbW92ZSgpLGYucmVzb2x2ZShiKX1mdW5jdGlvbiBlKCl7aC5yZW1vdmUoKSxmLnJlamVjdChcImxvYWQgZXJyb3JcIil9ZnVuY3Rpb24gZygpe2MoZnVuY3Rpb24oKXtoWzBdLnBhcmVudE5vZGUmJihoWzBdLmR1cmF0aW9uP2QoKTppPjEwP2UoKTpnKCkpfSwxZTMpfXZhciBoPWFuZ3VsYXIuZWxlbWVudCgwPT09YS50eXBlLmluZGV4T2YoXCJhdWRpb1wiKT9cIjxhdWRpbz5cIjpcIjx2aWRlbz5cIikuYXR0cihcInNyY1wiLGIpLmNzcyhcInZpc2liaWxpdHlcIixcIm5vbmVcIikuY3NzKFwicG9zaXRpb25cIixcImZpeGVkXCIpO2gub24oXCJsb2FkZWRtZXRhZGF0YVwiLGQpLGgub24oXCJlcnJvclwiLGUpO3ZhciBpPTA7ZygpLGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KS5hcHBlbmQoaCl9LGZ1bmN0aW9uKCl7Zi5yZWplY3QoXCJsb2FkIGVycm9yXCIpfSl9KSxhLiRuZ2ZEdXJhdGlvblByb21pc2U9Zi5wcm9taXNlLGEuJG5nZkR1cmF0aW9uUHJvbWlzZVtcImZpbmFsbHlcIl0oZnVuY3Rpb24oKXtkZWxldGUgYS4kbmdmRHVyYXRpb25Qcm9taXNlfSksYS4kbmdmRHVyYXRpb25Qcm9taXNlfSxlfV0pLG5nRmlsZVVwbG9hZC5zZXJ2aWNlKFwiVXBsb2FkUmVzaXplXCIsW1wiVXBsb2FkVmFsaWRhdGVcIixcIiRxXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGEsYixjKXt2YXIgZD1hLGU9ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9TWF0aC5taW4oYy9hLGQvYik7cmV0dXJue3dpZHRoOmEqZSxoZWlnaHQ6YiplfX0sZj1mdW5jdGlvbihhLGMsZCxmLGcpe3ZhciBoPWIuZGVmZXIoKSxpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksaj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO3JldHVybiBqLm9ubG9hZD1mdW5jdGlvbigpe3RyeXt2YXIgYT1lKGoud2lkdGgsai5oZWlnaHQsYyxkKTtpLndpZHRoPWEud2lkdGgsaS5oZWlnaHQ9YS5oZWlnaHQ7dmFyIGI9aS5nZXRDb250ZXh0KFwiMmRcIik7Yi5kcmF3SW1hZ2UoaiwwLDAsYS53aWR0aCxhLmhlaWdodCksaC5yZXNvbHZlKGkudG9EYXRhVVJMKGd8fFwiaW1hZ2UvV2ViUFwiLGZ8fDEpKX1jYXRjaChrKXtoLnJlamVjdChrKX19LGoub25lcnJvcj1mdW5jdGlvbigpe2gucmVqZWN0KCl9LGouc3JjPWEsaC5wcm9taXNlfSxnPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1hLnNwbGl0KFwiLFwiKSxjPWJbMF0ubWF0Y2goLzooLio/KTsvKVsxXSxkPWF0b2IoYlsxXSksZT1kLmxlbmd0aCxmPW5ldyBVaW50OEFycmF5KGUpO2UtLTspZltlXT1kLmNoYXJDb2RlQXQoZSk7cmV0dXJuIG5ldyBCbG9iKFtmXSx7dHlwZTpjfSl9O3JldHVybiBkLmlzUmVzaXplU3VwcG9ydGVkPWZ1bmN0aW9uKCl7dmFyIGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtyZXR1cm4gd2luZG93LmF0b2ImJmEuZ2V0Q29udGV4dCYmYS5nZXRDb250ZXh0KFwiMmRcIil9LGQucmVzaXplPWZ1bmN0aW9uKGEsZSxoLGkpe3ZhciBqPWIuZGVmZXIoKTtyZXR1cm4gMCE9PWEudHlwZS5pbmRleE9mKFwiaW1hZ2VcIik/KGMoZnVuY3Rpb24oKXtqLnJlc29sdmUoXCJPbmx5IGltYWdlcyBhcmUgYWxsb3dlZCBmb3IgcmVzaXppbmchXCIpfSksai5wcm9taXNlKTooZC5kYXRhVXJsKGEsITApLnRoZW4oZnVuY3Rpb24oYil7ZihiLGUsaCxpLGEudHlwZSkudGhlbihmdW5jdGlvbihiKXt2YXIgYz1nKGIpO2MubmFtZT1hLm5hbWUsai5yZXNvbHZlKGMpfSxmdW5jdGlvbigpe2oucmVqZWN0KCl9KX0sZnVuY3Rpb24oKXtqLnJlamVjdCgpfSksai5wcm9taXNlKX0sZH1dKSxmdW5jdGlvbigpe2Z1bmN0aW9uIGEoYSxjLGQsZSxmLGcsaCxpKXtmdW5jdGlvbiBqKCl7cmV0dXJuIGMuYXR0cihcImRpc2FibGVkXCIpfHxuKFwibmdmRHJvcERpc2FibGVkXCIsYSl9ZnVuY3Rpb24gayhhLGIsYyxkKXt2YXIgZT1uKFwibmdmRHJhZ092ZXJDbGFzc1wiLGEseyRldmVudDpjfSksZj1uKFwibmdmRHJhZ092ZXJDbGFzc1wiKXx8XCJkcmFnb3ZlclwiO2lmKGFuZ3VsYXIuaXNTdHJpbmcoZSkpcmV0dXJuIHZvaWQgZChlKTtpZihlJiYoZS5kZWxheSYmKHI9ZS5kZWxheSksZS5hY2NlcHR8fGUucmVqZWN0KSl7dmFyIGc9Yy5kYXRhVHJhbnNmZXIuaXRlbXM7aWYobnVsbCE9Zylmb3IodmFyIGg9bihcIm5nZlBhdHRlcm5cIixhLHskZXZlbnQ6Y30pLGo9MDtqPGcubGVuZ3RoO2orKylpZihcImZpbGVcIj09PWdbal0ua2luZHx8XCJcIj09PWdbal0ua2luZCl7aWYoIWkudmFsaWRhdGVQYXR0ZXJuKGdbal0saCkpe2Y9ZS5yZWplY3Q7YnJlYWt9Zj1lLmFjY2VwdH19ZChmKX1mdW5jdGlvbiBsKGEsYixjLGQpe2Z1bmN0aW9uIGUoYSxiLGMpe2lmKG51bGwhPWIpaWYoYi5pc0RpcmVjdG9yeSl7dmFyIGQ9KGN8fFwiXCIpK2IubmFtZTthLnB1c2goe25hbWU6Yi5uYW1lLHR5cGU6XCJkaXJlY3RvcnlcIixwYXRoOmR9KTt2YXIgZj1iLmNyZWF0ZVJlYWRlcigpLGc9W107aSsrO3ZhciBoPWZ1bmN0aW9uKCl7Zi5yZWFkRW50cmllcyhmdW5jdGlvbihkKXt0cnl7aWYoZC5sZW5ndGgpZz1nLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkfHxbXSwwKSksaCgpO2Vsc2V7Zm9yKHZhciBmPTA7ZjxnLmxlbmd0aDtmKyspZShhLGdbZl0sKGM/YzpcIlwiKStiLm5hbWUrXCIvXCIpO2ktLX19Y2F0Y2goail7aS0tLGNvbnNvbGUuZXJyb3Ioail9fSxmdW5jdGlvbigpe2ktLX0pfTtoKCl9ZWxzZSBpKyssYi5maWxlKGZ1bmN0aW9uKGIpe3RyeXtpLS0sYi5wYXRoPShjP2M6XCJcIikrYi5uYW1lLGEucHVzaChiKX1jYXRjaChkKXtpLS0sY29uc29sZS5lcnJvcihkKX19LGZ1bmN0aW9uKCl7aS0tfSl9dmFyIGY9W10saT0wLGo9YS5kYXRhVHJhbnNmZXIuaXRlbXM7aWYoaiYmai5sZW5ndGg+MCYmXCJmaWxlXCIhPT1oLnByb3RvY29sKCkpZm9yKHZhciBrPTA7azxqLmxlbmd0aDtrKyspe2lmKGpba10ud2Via2l0R2V0QXNFbnRyeSYmaltrXS53ZWJraXRHZXRBc0VudHJ5KCkmJmpba10ud2Via2l0R2V0QXNFbnRyeSgpLmlzRGlyZWN0b3J5KXt2YXIgbD1qW2tdLndlYmtpdEdldEFzRW50cnkoKTtpZihsLmlzRGlyZWN0b3J5JiYhYyljb250aW51ZTtudWxsIT1sJiZlKGYsbCl9ZWxzZXt2YXIgbT1qW2tdLmdldEFzRmlsZSgpO251bGwhPW0mJmYucHVzaChtKX1pZighZCYmZi5sZW5ndGg+MClicmVha31lbHNle3ZhciBuPWEuZGF0YVRyYW5zZmVyLmZpbGVzO2lmKG51bGwhPW4pZm9yKHZhciBvPTA7bzxuLmxlbmd0aCYmKGYucHVzaChuLml0ZW0obykpLGR8fCEoZi5sZW5ndGg+MCkpO28rKyk7fXZhciBwPTA7IWZ1bmN0aW9uIHEoYSl7ZyhmdW5jdGlvbigpe2lmKGkpMTAqcCsrPDJlNCYmcSgxMCk7ZWxzZXtpZighZCYmZi5sZW5ndGg+MSl7Zm9yKGs9MDtcImRpcmVjdG9yeVwiPT09ZltrXS50eXBlOylrKys7Zj1bZltrXV19YihmKX19LGF8fDApfSgpfXZhciBtPWIoKSxuPWZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gaS5hdHRyR2V0dGVyKGEsZCxiLGMpfTtpZihuKFwiZHJvcEF2YWlsYWJsZVwiKSYmZyhmdW5jdGlvbigpe2FbbihcImRyb3BBdmFpbGFibGVcIildP2FbbihcImRyb3BBdmFpbGFibGVcIildLnZhbHVlPW06YVtuKFwiZHJvcEF2YWlsYWJsZVwiKV09bX0pLCFtKXJldHVybiB2b2lkKG4oXCJuZ2ZIaWRlT25Ecm9wTm90QXZhaWxhYmxlXCIsYSk9PT0hMCYmYy5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpKTtpLnJlZ2lzdGVyVmFsaWRhdG9ycyhlLG51bGwsZCxhKTt2YXIgbyxwPW51bGwscT1mKG4oXCJuZ2ZTdG9wUHJvcGFnYXRpb25cIikpLHI9MTtjWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLGZ1bmN0aW9uKGIpe2lmKCFqKCkpe2lmKGIucHJldmVudERlZmF1bHQoKSxxKGEpJiZiLnN0b3BQcm9wYWdhdGlvbigpLG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKT4tMSl7dmFyIGU9Yi5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZDtiLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0PVwibW92ZVwiPT09ZXx8XCJsaW5rTW92ZVwiPT09ZT9cIm1vdmVcIjpcImNvcHlcIn1nLmNhbmNlbChwKSxvfHwobz1cIkNcIixrKGEsZCxiLGZ1bmN0aW9uKGEpe289YSxjLmFkZENsYXNzKG8pfSkpfX0sITEpLGNbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLGZ1bmN0aW9uKGIpe2ooKXx8KGIucHJldmVudERlZmF1bHQoKSxxKGEpJiZiLnN0b3BQcm9wYWdhdGlvbigpKX0sITEpLGNbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLGZ1bmN0aW9uKCl7aigpfHwocD1nKGZ1bmN0aW9uKCl7byYmYy5yZW1vdmVDbGFzcyhvKSxvPW51bGx9LHJ8fDEpKX0sITEpLGNbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIixmdW5jdGlvbihiKXtqKCl8fChiLnByZXZlbnREZWZhdWx0KCkscShhKSYmYi5zdG9wUHJvcGFnYXRpb24oKSxvJiZjLnJlbW92ZUNsYXNzKG8pLG89bnVsbCxsKGIsZnVuY3Rpb24oYyl7aS51cGRhdGVNb2RlbChlLGQsYSxuKFwibmdmQ2hhbmdlXCIpfHxuKFwibmdmRHJvcFwiKSxjLGIpfSxuKFwibmdmQWxsb3dEaXJcIixhKSE9PSExLG4oXCJtdWx0aXBsZVwiKXx8bihcIm5nZk11bHRpcGxlXCIsYSkpKX0sITEpLGNbMF0uYWRkRXZlbnRMaXN0ZW5lcihcInBhc3RlXCIsZnVuY3Rpb24oYil7aWYoIWooKSl7dmFyIGM9W10sZj1iLmNsaXBib2FyZERhdGF8fGIub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhO2lmKGYmJmYuaXRlbXMpe2Zvcih2YXIgZz0wO2c8Zi5pdGVtcy5sZW5ndGg7ZysrKS0xIT09Zi5pdGVtc1tnXS50eXBlLmluZGV4T2YoXCJpbWFnZVwiKSYmYy5wdXNoKGYuaXRlbXNbZ10uZ2V0QXNGaWxlKCkpO2kudXBkYXRlTW9kZWwoZSxkLGEsbihcIm5nZkNoYW5nZVwiKXx8bihcIm5nZkRyb3BcIiksYyxiKX19fSwhMSl9ZnVuY3Rpb24gYigpe3ZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cmV0dXJuXCJkcmFnZ2FibGVcImluIGEmJlwib25kcm9wXCJpbiBhJiYhL0VkZ2VcXC8xMi4vaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpfW5nRmlsZVVwbG9hZC5kaXJlY3RpdmUoXCJuZ2ZEcm9wXCIsW1wiJHBhcnNlXCIsXCIkdGltZW91dFwiLFwiJGxvY2F0aW9uXCIsXCJVcGxvYWRcIixmdW5jdGlvbihiLGMsZCxlKXtyZXR1cm57cmVzdHJpY3Q6XCJBRUNcIixyZXF1aXJlOlwiP25nTW9kZWxcIixsaW5rOmZ1bmN0aW9uKGYsZyxoLGkpe2EoZixnLGgsaSxiLGMsZCxlKX19fV0pLG5nRmlsZVVwbG9hZC5kaXJlY3RpdmUoXCJuZ2ZOb0ZpbGVEcm9wXCIsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oYSxjKXtiKCkmJmMuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKX19KSxuZ0ZpbGVVcGxvYWQuZGlyZWN0aXZlKFwibmdmRHJvcEF2YWlsYWJsZVwiLFtcIiRwYXJzZVwiLFwiJHRpbWVvdXRcIixcIlVwbG9hZFwiLGZ1bmN0aW9uKGEsYyxkKXtyZXR1cm4gZnVuY3Rpb24oZSxmLGcpe2lmKGIoKSl7dmFyIGg9YShkLmF0dHJHZXR0ZXIoXCJuZ2ZEcm9wQXZhaWxhYmxlXCIsZykpO2MoZnVuY3Rpb24oKXtoKGUpLGguYXNzaWduJiZoLmFzc2lnbihlLCEwKX0pfX19XSl9KCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9