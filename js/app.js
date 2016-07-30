var app = angular.module("myApp", [ 'ngRoute', 'ngCookies', 'angularUtils.directives.dirPagination' ]);

app.config(function($routeProvider) {
	$routeProvider.when("/login", {
		templateUrl : "views/login.html",
		controller : "RegistrationController"
	}).when("/register", {
		templateUrl : "views/register.html",
		controller : "RegistrationController"
	}).otherwise({
		redirectTo : "/login"
	});
});

app.run(function ($rootScope, $location, $cookieStore, $http) {
	$rootScope.log = true;
	$rootScope.list = $cookieStore.get('globalUsers');
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        $rootScope.log = false;
        $(".container").removeClass("col-sm-12");
        $rootScope.list = $cookieStore.get('globalUsers');
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
    	$rootScope.list = $cookieStore.get('globalUsers');
    	if($location.path() == '/login' && $rootScope.globals.currentUser){
    		$rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
            $rootScope.log = true;
    	}
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
        	
        		 $location.path('/login');
                 $rootScope.log = true;
        }
    });
});
