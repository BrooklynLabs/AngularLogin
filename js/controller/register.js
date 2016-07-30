app.controller("RegistrationController", function($scope, Authentication, $location, $rootScope, $cookieStore) {
	$scope.message = "Hello Login";
	$scope.users = $rootScope.list || {};
	$scope.user = {};
	$rootScope.editIndex = -1;
	$scope.enableEdit = function(index){
		console.log();
		/*$(".table input.checkbox").prop("checked", false);
		$(".table input.checkbox").eq(index).prop("checked", true);*/
	};
	$scope.items = [ {
		id: "$",
		label : "Search by"
	}, {
		id: "firstname",
		label : "firstname"
	}, {
		id: "empno",
		label : "empno"
	}, {
		id: "location",
		label : "location"
	}, {
		id: "phonenumber",
		label : "phonenumber"
	}, {
		id: "email",
		label : "email"
	} ];
	$scope.selectInput = $scope.items[0].id;
	$scope.register = function() {
		$scope.users = $cookieStore.get('globalUsers') || [];
		//Authentication.register();
		$scope.user.fullname = $scope.user.firstname + " " + $scope.user.lastname;
		$scope.user.checkbox = false;
		if($rootScope.editIndex > -1){
			$scope.users[$rootScope.editIndex] = $scope.user;
			$cookieStore.put('globalUsers', $scope.users);
			$rootScope.list = $cookieStore.get('globalUsers');
			//$rootScope.editIndex = -1;
		}else{
			console.log("his", typeof $scope.users);
			$scope.users.push($scope.user);
			$cookieStore.put('globalUsers', $scope.users);
			$rootScope.list = $cookieStore.get('globalUsers');
		}
		$scope.user = {};
		$scope.myform.$setUntouched();
	};
	$scope.login = function() {
		Authentication.ClearCredentials();
		Authentication.login($scope.user.email, $scope.user.password, function(response) {
			if (response.success) {
				Authentication.setCredentials($scope.user.email, $scope.user.password);
				$location.path("/register");
				$rootScope.log = false;
			} else {
				$scope.error = response.message;
			}
		});

	};
	$scope.deleteUsers = function(){
		var arr =[];
		angular.forEach($scope.users, function(value, key){
			if(!value.checkbox){
				arr.push(value);
			}
		});
		$cookieStore.put('globalUsers', arr);
		$rootScope.list = arr;
		
	};
	
	$scope.editUser = function(){
		console.log("old", $scope.users);
		$scope.users = $rootScope.list;
		var count = 0;
		angular.forEach($scope.users, function(value, key){
			if(value.checkbox){
				count+= 1;
			}
		});
		console.log("count", count);
		if(count >1){
			alert("Select a single checkbox to edit");
			return;
		}
		angular.forEach($scope.users, function(value, key){
			if(value.checkbox){
				console.log("new",$scope.users);
				$rootScope.editIndex = key;
				$scope.user = value;
			}
		});
	};
	

	/*
	 * $scope.logout = function(){
	 * 
	 * Authentication.ClearCredentials(); };
	 */
});