
var searchList_ctr = myApp.controller('searchList_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading','$filter', 
function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading,$filter) {
	$rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
	$scope.selectedProjectId = ioniclocalStorage.getObject("selectedProjectId");
	$scope.selectedProjectName = ioniclocalStorage.getObject("selectedProjectName");
	$rootScope.getProjectId=$scope.selectedProjectId;
	$rootScope.userID=	$rootScope.userInfo._id;
	
	
	
	$rootScope.categoryId = "";
    $scope.status = "";
	$scope.Title = "";
    $scope.domain = "";
    $scope.Abstract = "";
    $scope.infriLawCode = "";
    $rootScope.BaidukeywordId = "";
	
    $scope.GetBaiduLevelLinks = function () {
	    var url = "/api/Keyword/GetLevelLinks?user_id=" + $rootScope.userID + "&categoryId=" + $rootScope.categoryId + "&projectId=" + $rootScope.getProjectId + "&keywordId=" + "" + "&Title=" + $scope.Title +
	        "&domain=" + $scope.domain + "&infriLawCode=" + $scope.infriLawCode + "&page=" + ($scope.page2 - 1) + "&pagesize=" + $scope.pagesize2 + "&status=" + $scope.status;
	    var q = $http.get(url);
	    q.success(function (response, status) {

	        $scope.BaiduCount = response.Count;
	
	        if (response != null) {
	            $rootScope.resultList = response.Result;
	            console.log($rootScope.resultList)
	            $scope.Count = response.Count;
	        }
	    })
	    q.error(function (response) {
	        $scope.error = "服务器连接出错";
	    });
    }



	//____________________________________________________________________________________
	 $scope.GetBaiduLevelLinks();
	
}]);