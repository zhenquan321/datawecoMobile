
var community_ctr = myApp.controller('community_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading','$ionicListDelegate','$ionicScrollDelegate',
function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading,$ionicListDelegate,$ionicScrollDelegate) {
	
	$scope.selectModal=1;
  	$scope.page_Discover = 0;
    $scope.pagesize_Discover = 10;
    $scope.prjusrname = "";
   //下拉刷新
   	$scope.doRefresh = function() {
			$scope.$broadcast('scroll.refreshComplete');
	};
	//获取本地缓存数据
	$rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
	$rootScope.userID = $rootScope.userInfo._id;

	$scope.ChangeModal=function(num){

		$scope.selectModal=num;
		if(num==1){
    		$rootScope.GetShareToDiscover();
		}else if(num==2){
    		$rootScope.GetShareToDiscover();
		}else if(num==3){
			$rootScope.GetShareToDiscover();
		}
 		$ionicScrollDelegate.scrollTop();

	}

	
    //不同模块
    $scope.share_modal_n = [
        [ 12, "监测结果链接详情" ],
        [13, "监测结果详情" ],
        [ 14,"监测结果详情" ],
        [ 15, "监测结果详情" ],
        [ 51, "关键词共现" ],
        [ 17, "监测结果链接详情" ],
        [11, "词组关系树状图"],
         [59, "矩阵图"],
    ];

    $scope.share_modal_url = [
        [12, "rizhi/baidu_share_1"],
        [13, "rizhi/baidu_share_2"],
        [14, "rizhi/baidu_share_3"],
        [15, "rizhi/baidu_share_4"],
        [51, "rizhi/baidu_share_5"],
        [17, "rizhi/baidu_share_6"],
        [11, "rizhi/baidu_share_7"],
         [59, "rizhi/baidu_share_8"],
    ];
    //获取分享到发现
    $rootScope.GetShareToDiscover = function () {
        $scope.anaItem = {
            prjId:"",
            opereateType: "",
            page: $scope.page_Discover,
            pagesize: $scope.pagesize_Discover,
            siteSource: "",
            prjusrname: $scope.prjusrname,
        };
        $http({
            method: 'get',
            params: $scope.anaItem,
            url: MyProvider.domain+"/api/Share/GetShareToDiscover"
        })
            .success(function (response, status) {
                console.log(response);
                $scope.aaa2 = response.Result;
                if ($scope.pagesize_Discover > $scope.aaa2.length) {
                    $scope.active_more = false;
                }
                var QRCode_url = $location.host() + ":" + $location.port() + "/#/";
                QRCode_url = "http://" + QRCode_url;
                
                for (var i = 0; i < $scope.aaa2.length; i++) {
                    for (var z = 0; z < $scope.share_modal_n.length;z++){
                        if ($scope.aaa2[i].ShareOperateType == $scope.share_modal_n[z][0]) {
                            $scope.aaa2[i].title_a = $scope.share_modal_n[z][1];
                            $scope.aaa2[i].modelUrl =QRCode_url+ $scope.share_modal_url[z][1];
                        }
                       }
                    }
                $rootScope.ShareToDiscover_list = $scope.aaa2;


                $rootScope.ShareToDiscover_Count = response.Count;
            })
            .error(function (response, status) {
               // $scope.addAlert('danger', "服务器连接出错");
            });
    }
    //加载更多
    $rootScope.GetShareToDiscover_more = function () {
        $scope.pagesize_Discover = $scope.pagesize_Discover + 10;
        $rootScope.GetShareToDiscover();
    }
  //删除分享到发现
    $rootScope.DelShareToDiscover = function (id,id2,id3) {
        if (confirm("您确认删除此分享吗？")) {
            $scope.anaItem = {
                prjId: id2,
                usr_id: id3,
                commentId: id,
            };
            $http({
                method: 'get',
                params: $scope.anaItem,
                url: "/api/Share/DelShareToDiscover"
            })
                .success(function (response, status) {
                    $rootScope.GetShareToDiscover();
                    $rootScope.addAlert('success', "删除评论成功！");
                    $rootScope.GetShareOutComment($scope.num, $scope.num2);
                })
                .error(function (response, status) {
                    $scope.addAlert('danger', "服务器连接出错");
                });
        }

    }
    //自动加载______________________________________________________________________________
   $rootScope.GetShareToDiscover();


}]);