appManager.directive("passwordCheck",function(){
	return {
		require: "ngModel",
		link:function(scope,elem,attrs,ctrl){
			var firstPassword=angular.element(document.getElementById(attrs.passwordCheck));
			elem.on("keyup",check);
			firstPassword.on("keyup",check);
			function check(){
				scope.$apply(function(){
					var v = elem.val()===firstPassword.val();
					ctrl.$setValidity("passwordmatch",v);
				});
			}
		}
	}
});
