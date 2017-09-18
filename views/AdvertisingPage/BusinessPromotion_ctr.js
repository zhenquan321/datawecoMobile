//收益
var BusinessPromotion_ctr = myApp.controller('BusinessPromotion_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading','$interval', function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading,$interval) {
    $scope.changepayG=true;
    $scope.haveSaomiaoed=false;
    $scope.qrcode="";
    $scope.userInfoCrt={
        loginName:'',
        password:'',
    }
    //获取本地缓存数据
    $rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
    //获取产品
    $scope.GetProduct = function () {
        var url = MyProvider.domain +"/api/Pay/GetProduct?page=" + 0 + "&pagesize=" + 1000;
        var q = $http.get(url);
        q.success(function (response, status) {
            console.log(response);
            $rootScope.GetProductList = response.Result;
            $scope.GetProductListCount = response.Count;
            ioniclocalStorage.setObject('GetProductList', $rootScope.GetProductList);
            $scope.InsertActivityOrder(7);
        });
        q.error(function (response) {
            $scope.error = "网络打盹了，请稍后。。。";
        });
    }
   //切换支付方式____________________________
    $scope.ZFFS=1;
    $scope.changeZFFS=function(num){
        $scope.ZFFS=num;
    }
   //直接支付
   $scope.InsertOrderByUrl=function(num){
    var id= $rootScope.GetProductList[num].Id;
     $scope.ProductShow=$rootScope.GetProductList[num];
     $scope.anaItem = {
         productList: [{ id: id, num: 1 }],
         couponCode:'',
         userId: "587b5379cba12d035c51ce23",
     };
     var urls = MyProvider.domain + "/api/Pay/InsertOrderByUrl";
     var q = $http.post(
         urls,
         JSON.stringify($scope.anaItem),
         {
             headers: {
             'Content-Type': 'application/json'
             }
         }
     )
     q.success(function (response, status) {
        publicFunc.showAlert("温馨提示", response+'1');
        publicFunc.showAlert("温馨提示", response.url+"2");
        $scope.response=response;
     if (response.url) {
         $scope.qrcode = MyProvider.domain +response.qrcode;
         $scope.Order=response.order;
         $scope.userId=response.userId
         $scope.GetOrderStatus();
     } else {
        $scope.InsertOrderByUrl(num);
     }
     });
     q.error(function (e) {
        publicFunc.showAlert("温馨提示", e +"ssss");
     });
  }

    //生成订单
    $scope.InsertActivityOrder=function(num){
       var id= $rootScope.GetProductList[num].Id;
        $scope.ProductShow=$rootScope.GetProductList[num];
        $scope.anaItem = {
            productList: [{ id: id, num: 1 }],
            couponCode:'',
        };
        var urls = MyProvider.domain + "/api/Pay/InsertActivityOrder";
        var q = $http.post(
            urls,
            JSON.stringify($scope.anaItem),
            {
                headers: {
                'Content-Type': 'application/json'
                }
            }
        )
        q.success(function (response, status) {
          
        if (response.qrcode) {
            $scope.qrcode = MyProvider.domain +response.qrcode;
            $scope.Order=response.order;
            $scope.userId=response.userId
            $scope.GetOrderStatus();
        } else {
            $scope.InsertActivityOrder(num);
        }
        });
        q.error(function (e) {
            
        });
    }
    //是否支付成功
    //判断是否支付完成
    $scope.GetOrderStatus = function () {
        var url = MyProvider.domain +"/api/Pay/GetOrderStatus?orderId=" + $scope.Order.Id;
        var q = $http.get(url);
        q.success(function (response, status) {
            if (response) {
                $scope.haveSaomiao(true);
            }else{
                $timeout(function () {
                    $scope.$apply(function() {  
                         $scope.GetOrderStatus(); 
                    }); 
                }, 500);
            }
        });
        q.error(function (response) {
            $scope.error = "接口调用连接出错";
        });
    };
  
    $scope.changepayGFun=function(num){
        if(num==0){
            $scope.changepayG=false;
            $scope.InsertActivityOrder(8);
        }else if(num==1){
            $scope.changepayG=true; 
            $scope.InsertActivityOrder(7);
        }
    }
    //扫描二维码后注册
    $scope.haveSaomiao=function(state){
        $scope.haveSaomiaoed=state;
    }
    //创建用户
    $scope.createUser=function(){
        if(!$scope.userInfoCrt.loginName){
           publicFunc.showAlert("温馨提示", "用户名不能为空", '确定');
            return
        }
        if(!$scope.userInfoCrt.password){
            publicFunc.showAlert("温馨提示", "请输入登录密码！", '确定');
            return
        }
        $scope.anaItem = {
            userName:$scope.userInfoCrt.loginName,
            pwd1:$scope.userInfoCrt.password,
            pwd2:$scope.userInfoCrt.password,
            userId:$scope.userId,
            email:$scope.userInfoCrt.email,
        };
        $http({
            method: 'get',
            params: $scope.anaItem,
            url:  MyProvider.domain+"/api/Pay/RegisterActivityUser"
        })
            .success(function (response, status) {
                if(response.IsSuccess){
                    $scope.login($scope.userInfoCrt.loginName,$scope.userInfoCrt.password);
                }else{
                     publicFunc.showAlert("提醒", response.Message, '确定');
                }
               
            })
            .error(function (response, status) {
              
            });
     }
     $scope.login = function(loginName,password) {
        var ip = returnCitySN["cip"];
        var url = MyProvider.domain +"/api/Account/Login?uName=" + loginName + "&uPwd=" + password  +"&ip="+ip;
        var q = $http.get(url);
            q.success(function(response, status, headers, config) {
                $log.info(response);
                if(response._id) {
                    ioniclocalStorage.setObject('userInfo', response);
                    $location.path("/tabs/UserMag").replace();
                    $timeout(function(){
                        publicFunc.showAlert("感谢", "非常感谢您加入社创数据大家庭，我们将全心全意为您服务！", '确定');
                    },300)
                } else {
                  
                }
            })
            q.error(function(response, status, headers, config) {
              
            });
    }
    //_______________________________________________________________________________________________________
     $scope.GetProduct();
}])