var appManager=angular.module("appManager",["ui.router","managerCtrls"]);


appManager.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});
appManager.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise("/login");
	$stateProvider
		.state("login",{
			url: "/login",
			templateUrl: "tpls/login.html"
		})
		.state("register",{
			url: "/register",
			templateUrl: "tpls/register.html"
		})
		.state("location",{
			url:"/location",
			views: {
				"": {
						templateUrl: "tpls/main.html"
				},
				"powerlist@location": {
					templateUrl: "tpls/powerlist.html"
				},
				"mainview@location": {
					templateUrl: "tpls/location.html"
				}
			}
		});
});