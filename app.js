
/**
 * app.routes
 * @desc    contains the routes for the app
 */

 var app = angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'app.companies', 'app.fellows', 'app.profile'])
    .run(run);

/**
 *   * @name config
 *     * @desc Define valid application routes
 *       */
 app.config(function($routeProvider){

    $routeProvider
    .when('/', {
        controller  : 'RoutingController',
        templateUrl : 'source/app/home/home.html'
    })
    .when('/fellows', {
        controller: 'RoutingController',
        templateUrl: 'source/app/fellows/fellows.html'
    })
    .when('/companies', {
        controller: 'CompaniesController',
        templateUrl: 'source/app/companies/companies.html'
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
    .otherwise({ redirectTo: '/' });

});

app.controller('RoutingController', RoutingController)
.controller('LoginModalInstanceController', LoginModalInstanceController);

RoutingController.$inject = ['$scope', '$modal'];
LoginModalInstanceController.$inject = ['$scope', '$modalInstance', 'User'];

function RoutingController($scope, $modal) {

  $scope.openModal = function() {
    var modalInstance = $modal.open({
        templateUrl: 'source/app/profile/partials/login-page.html',
        controller: 'LoginModalInstanceController',
        size: 'sm'
    });
}
}

function LoginModalInstanceController ($scope, $modalInstance, User) {

    // save this through a refesh
    $scope.loginForm = {

        email: "",
        password: ""
    };

    $scope.login = function(loginForm) {

        console.log(loginForm);
        User.login(loginForm).success(function(user){

            //console.log(user);
            //User.currentUser = user

            User.SetCredentials(user.email, user.password, "Fellow");
        });

        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}


run.$inject = ['$cookieStore', 'User'];
function run($cookieStore, User) {

    // keep user logged in after page refresh
    var currentUser = $cookieStore.get('globals') || {};
    User.setCurrentUser(currentUser);

    console.log(currentUser);
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
