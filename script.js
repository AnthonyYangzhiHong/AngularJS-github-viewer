(function(){
	var app=angular.module("githubViewer",[])
	function MainController($scope,github,$interval,$anchorScroll,$location) {
		var onUserComplete=function(data){
			$scope.user=data;
			github.getRepos($scope.user).then(onRepos,onError);
		};
	
		var onRepos=function(response){
			$scope.repos=response.data;
			$location.hash("userdetails");
			$anchorScroll();
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
			github.getUser(username).then(onUserComplete,onError);
			if(countdownInterval){
				$interval.cancel(countdownInterval);
				$scope.countdown=null;
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