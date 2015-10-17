function MainController($scope,$http) {
	var onUserComplete=function(response){
		$scope.user=response.data;
	}
	
	var onError=function(reason){
		$scope.error="could not fetch them"
	}
	$http.get("https://api.github.com/users/robconery").then(onUserComplete,onError);
	

	 $scope.message="hello";
    }