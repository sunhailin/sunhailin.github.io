var managerCtrls = angular.module("managerCtrls",[]);
managerCtrls.controller("loginCtrl",["$scope","$rootScope",
	function($scope,$rootScope){
		$rootScope.isRegisterShow=true;
		$rootScope.isCenterShow=false;
		$rootScope.isExitShow=false;
		$rootScope.isLoginShow=false;
		document.title="登录";
		
		$scope.submit=function(){
			console.log($scope.user.account);
			console.log($scope.user.password);
		};
	}
]);

managerCtrls.controller("registerCtrl",["$scope","$rootScope",
	function($scope,$rootScope){
		$rootScope.isRegisterShow=false;
		$rootScope.isCenterShow=false;
		$rootScope.isExitShow=false;
		$rootScope.isLoginShow=true;
		document.title="注册";
		
		$scope.submit=function(b){
			console.log($scope.user.account);
			console.log($scope.user.username);
            console.log($scope.user.password);
		};
	}
]);
