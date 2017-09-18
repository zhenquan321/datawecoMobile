
var modelselect_ctr = myApp.controller('modelselect_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading','$filter', 
function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading,$filter) {

	$rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
	$scope.selectedProjectId = ioniclocalStorage.getObject("selectedProjectId");
	$scope.selectedProjectName = ioniclocalStorage.getObject("selectedProjectName");
	$rootScope.getProjectId=$scope.selectedProjectId;
	$rootScope.userID=	$rootScope.userInfo._id;
	

	//下拉刷新
	$scope.doRefresh = function() {
		$scope.$broadcast('scroll.refreshComplete');
	};
	//____________________________________________________________________________________
	
	
}]);