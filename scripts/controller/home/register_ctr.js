//注册
var register_ctr = myApp.controller('register_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading', function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading) {
	$scope.mobile = "";
	$scope.password = "";
	$scope.mobile = "";
	$scope.paracont = "获取短信码";
	$scope.pic_yzm = "";
	$scope.showpic_yzm = false;
	$scope.inputpic_yzm = "";
	$scope.inputMobile_yzm = 888888;
	var myDate = new Date();
	//		var mytime = myDate.toLocaleTimeString(); //获取当前时间
	//		$log.info(mytime);
	$scope.sim = "8911118888811119999999999999999999991111";
	$scope.guid = "488";
	$scope.device = "12300045886";
	$scope.type = "Android";

	

	//获取图片验证码

	$scope.register = function() {
		var url = MyProvider.domain + "/user/register.do?username=" + $scope.mobile +
			"&password=" + $scope.password + "&code=" + $scope.inputMobile_yzm + "&imagecode=" + $scope.inputpic_yzm +
			"&sim=" + $scope.sim + "&device=" + $scope.device + "&guid=" + $scope.guid + "&type=" + "Android";
		$log.info(url);
		$http.get(url)
			.success(function(response) {
				if (response.status.msg == "SUCCESS") {
					//publicFunc.showAlert("温馨提示","恭喜您,注册成功！");
					$location.path("/login").replace();
				} else {
					publicFunc.showAlert("温馨提示", response.status.msg,"我知道了");
				}

			})
			.error(function(response) {
				$log.info(response);
			});
	}
	
	 //3.注册_________________________________
    $scope.Regist = function () {
        var pattern = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        if ($scope.uName == "" || $scope.uName.length < 6) {
        	publicFunc.showAlert("温馨提示", "用户名长度至少为6位","我知道了");
            $scope.error = "用户名长度至少为6位";
            return;
        }
        if ($scope.uPwd1 == "" || $scope.uPwd1.length < 6) {
        	publicFunc.showAlert("温馨提示", "密码长度至少为6位","我知道了");	
            $scope.error = "密码长度至少为6位";
            return;
        }
        if ($scope.uPwd2 == "" || $scope.uPwd2 != $scope.uPwd1) {
            publicFunc.showAlert("温馨提示", "密码不一致","我知道了");
            $scope.error = "密码不一致";
            return;
        }
        if ($scope.email == "") {
            publicFunc.showAlert("温馨提示", "请输入邮箱","我知道了");
            $scope.error = "请输入邮箱";
            return;
        }
        if ($scope.email.match(pattern) == null) {
            publicFunc.showAlert("温馨提示", "邮箱格式不正确","我知道了");
            $scope.error = "邮箱格式不正确";
            return;
        }
        else {
            var url = MyProvider.domain + "/api/Account/Regist?uName=" + $scope.uName + "&uPwd2=" + $scope.uPwd2 + "&uPwd1=" + $scope.uPwd1 + "&email=" + $scope.email;
            var q = $http.get(url);
            q.success(function (response, status) {

            	if (!response.Error) {
					publicFunc.showAlert("欢迎加入","感谢您DataWeco社创数据，我们将全心全意为您服务！","确定");
					ioniclocalStorage.setObject('userInfo', response);
					$location.path("tabs/UserMag").replace();
				} else {
					publicFunc.showAlert("温馨提示", response.Error,"我知道了");
				}
                
            });
            q.error(function (response) {
                $scope.error = "服务器连接出错";
            });
        }
    }
}])