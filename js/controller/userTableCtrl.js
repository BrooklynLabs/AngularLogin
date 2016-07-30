app.controller("userTableCtrl", function($scope){
	
	
	$scope.deleteUsers = function(){
		console.log($scope.users);
		angular.forEach($scope.users, function(){
			console.log(1);
		});
	}
	

});
app.controller("HomeController", function($scope, Authentication){
	$scope.logout = function(){
		
		Authentication.ClearCredentials();
	};
});
