
var seting_ctr = myApp.controller('seting_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading', function ($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading) {
    //获取本地缓存数据
    $rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
    $rootScope.PictureSrc = $rootScope.userInfo.PictureSrc;
    $rootScope.Gender = $rootScope.userInfo.Gender;
    
    //下拉刷新
    $scope.doRefresh = function () {
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.getout = function () {
        ioniclocalStorage.setObject('userInfo', []);
        $rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
        $location.path("/login").replace();
    }

	
}]);
  