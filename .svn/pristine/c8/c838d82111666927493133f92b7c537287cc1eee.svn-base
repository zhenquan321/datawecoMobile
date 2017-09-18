//忘记密码
var forgetPwd_ctr = myApp.controller('forgetPwd_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading',function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage,$ionicLoading) {
	$scope.mobile = "";
	$scope.password= "";
    $scope.paracont = "获取短信码";  
	$scope.code= 888888;

	$scope.forgetPwd = function() {
		var url = MyProvider.domain + "/api/Account/FindPwd?email=" + $scope.email + "&loginName=" + $scope.uName;
			$log.info(url);
		$http.get(url)
			.success(function(response) {
					if (!response.Error) {
						publicFunc.showAlert("温馨提示", "临时密码已经发至您邮箱，请注意查看","我知道了");
						$location.path("/login").replace();
					} else {
						publicFunc.showAlert("温馨提示", response.Error,"我知道了");
					}
			})
			.error(function(response) {
				$log.info(response);
			});
	}
}])
