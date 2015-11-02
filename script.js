(function(){
	var app=angular.module("githubViewer",[])
	function MainController($scope,$http,$interval) {
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
		
		var decrementCountdown=function(){
			$scope.countdown-=1;
			if($scope.countdown<1){
				$scope.search($scope.username);
			};
		};
		var countdownInterval=null;
		var startCountdown=function(){
			countdownInterval=$interval(decrementCountdown,1000,$scope.countdown);
		}
		//$http.get("https://api.github.com/users/robconery").then(onUserComplete,onError);
		$scope.search=function(username){
			console.log("search user");
			$http.get("https://api.github.com/users/"+username).then(onUserComplete,onError);
			if(countdownInterval){
				$interval.cancel(countdownInterval);
			}
		};

		$scope.message="Github Viewer";
		$scope.username="angular";
		$scope.repoSortOrder="-stargazers_count";
		$scope.countdown=5;
		startCountdown();
    };
	
	app.controller("MainController",MainController);
}());