/**
 * 
 */

app.directive("userTable", function(){
	
	return {
		
		templateUrl: "views/userTable.html",
		controller: "userTableCtrl",
		scope:false
		/*compile: function(tElement, tAttrs, transclude){
			angular.element(tElement).find("select:first-child").html("Search by");
			console.log(angular.element(tElement).find("select:first-child"));
		}*/
	}
});