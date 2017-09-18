
var addProject_ctr = myApp.controller('addProject_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading', function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading) {
	$rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
	$scope.projectName == "";
	$scope.projectNameDescribe == "";
	
	
	
	//下拉刷新
	$scope.doRefresh = function() {
		$scope.$broadcast('scroll.refreshComplete');
	};


    //1.创建项目
    $scope.InsertProject = function () {
    	 $scope.projectName=$("#projectName").val();
    	 $scope.projectNameDescribe=$("#projectNameDescribe").val();
    	if(!$scope.projectName) {
			publicFunc.showAlert("温馨提示", "项目名称不能为空", '确定');
			return
		} else if(!$scope.projectNameDescribe) {
			publicFunc.showAlert("温馨提示", "项目描述不能为空", '确定');
			return
		}
        var url = MyProvider.domain +"/api/Keyword/InsertProject?usr_id=" + $rootScope.userInfo._id+ "&name=" + $scope.projectName + "&description=" + $scope.projectNameDescribe;
        var q = $http.get(url);
        q.success(function (response, status) {
            console.log('addProject_ctr>InsertProject');
            $scope.massage = response.Message;
            if (response.IsSuccess != true) {
                $scope.error = $scope.massage;

            } else{
            	$location.path("/tabs/project").replace();
            }
        });
        q.error(function (response) {
            $scope.error = "服务器连接出错";
        });
    };



}])