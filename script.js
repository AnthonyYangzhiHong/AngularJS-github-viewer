(function(){
	var app=angular.module("githubViewer",[])
	function MainController($scope,$http) {
		var onUserComplete=function(response){
			$scope.user=response.data;
			$http.get($scope.user.repos_url).then(onRepos,onError);
		};
	
		var onRepos=function(response){
			$scope.repos=response.data;
		};
		
		var onError=function(reason){
			$scope.error="could not fetch the data";
		};
		//$http.get("https://api.github.com/users/robconery").then(onUserComplete,onError);
		$scope.search=function(username){
			console.log("search user");
			$http.get("https://api.github.com/users/"+username).then(onUserComplete,onError);
		};

		$scope.message="hello";
    };
	
	app.controller("MainController",MainController);
}());