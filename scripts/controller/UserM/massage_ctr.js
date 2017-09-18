
var massage_ctr = myApp.controller('massage_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading', function ($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading) {
    //获取本地缓存数据
    $rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
    $rootScope.PictureSrc ='http://211.154.6.166:9000/' + $rootScope.userInfo.PictureSrc;
    $rootScope.Gender = $rootScope.userInfo.Gender;
    
    //下拉刷新
    $scope.doRefresh = function () {
        $scope.$broadcast('scroll.refreshComplete');
    };





	
}]);