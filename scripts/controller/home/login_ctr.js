//登录
var login_ctr = myApp.controller('login_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading', 'ionicDatePicker', 'ionicTimePicker', 'ionicToast',
	function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading, ionicDatePicker, ionicTimePicker, ionicToast) {
		$scope.mobile = "";
		$scope.password = "";

//		$ionicLoading.show({
//			template: '这是提示框',
//			noBackdrop: true,
//			duration: 2000,
//			animation: 'fade-in'
//		});
		if(ioniclocalStorage.getObject("userInfo")._id){
			$location.path("/tabs/gains").replace();
		};
		$scope.showToast = function() {
			//<!-- ionicToast.show(message, position, stick, time); -->
			ionicToast.show('This is a toast at the top.', 'top', true, 2500);
		};
	
		$scope.hideToast = function() {
			ionicToast.hide();
		};


		$scope.login = function() {
			if($scope.mobile == "" || $scope.password == "") {
				if($scope.mobile == "") {
					publicFunc.showAlert("温馨提示", "用户名不能为空", '确定');
				} else if($scope.password == "") {
					publicFunc.showAlert("温馨提示", "请输入密码", '确定');
				}
			} else {
				//var infoMobile = publicFunc.isMobile($scope.mobile);
				
					//url需要传的参数
//					$scope.paramsList = {
//						uName:$scope.mobile,
//						uPwd:$scope.password,
//					};
					var ip = returnCitySN["cip"];
					var url = MyProvider.domain +"/api/Account/Login?uName=" + $scope.mobile + "&uPwd=" + $scope.password  +"&ip="+ip;
            		var q = $http.get(url);
					
					//方便在外部添加参数
//					var paramsList = publicFunc.paramsConfig($scope.paramsList);
//					$http({
//							method: 'get',
//							params: $scope.paramsList,
//							url: MyProvider.domain + "/api/Account/Login",
//						})
						q.success(function(response, status, headers, config) {
							$log.info(response);
							if(!response.Error) {
								$location.path("/tabs/gains").replace();
								ioniclocalStorage.setObject('userInfo', response);
							} else {
								publicFunc.showAlert("温馨提示", response.Error, "我知道了");
							}
						})
						q.error(function(response, status, headers, config) {
							publicFunc.showAlert("温馨提示", "连接接服务器出错", "我知道了");
						});

				
				}
			
		}
	}
])