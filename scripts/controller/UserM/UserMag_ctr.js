
var UserMag_ctr = myApp.controller('UserMag_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading','$filter',
function ($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading,$filter) {
    //获取本地缓存数据
    $rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
    $rootScope.PictureSrc =$rootScope.userInfo.PictureSrc;
    $rootScope.Gender = $rootScope.userInfo.Gender;
	$rootScope.LoginName = $rootScope.userInfo.LoginName;
    //下拉刷新
    $scope.doRefresh = function () {
        $scope.$broadcast('scroll.refreshComplete');
    };



    $log.info($rootScope.income);

    $scope.getout = function () {
        ioniclocalStorage.setObject('userInfo', []);
        $rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
        $location.path("/login").replace();
    }



	//我的项目
	$scope.getMyProject=function(){
		
		var url = MyProvider.domain +"/api/Statistics/GetProjectCountSta?userId=" + $rootScope.userInfo._id;
		var q = $http.get(url);
			q.success(function(response, status) {
				$log.info(response);
				
				var TimeData=response.Times;
				for(var i=0;i<TimeData.length;i++){
					TimeData[i]=$filter('date')(TimeData[i],'yyyy-MM-dd');
				}

				var myChart = echarts.init(document.getElementById('projectNow'));

	        	// 指定图表的配置项和数据
				option = {
					color:['#099','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
				    title: {
				        text: '项目数',
				        left: 'left',
				        textStyle:{
				        	fontSize:'14',
				        }
				    },
				    tooltip: {
				        trigger: 'item',
				        formatter: '{a} <br/>{b} : {c}'
				    },
				    legend: {
				        data:['创建','分享','收到']
				    },
				    xAxis: {
				        type: 'category',
				        splitLine: {show: false},
				        data: TimeData,
				        axisLine:{
					    	show: false,
				            lineStyle:{
				            color:'#999'
				        	}  
						 },
						axisLabel:{//轴线刻度属性
				        	textStyle:{
				        		fontSize:'10',
				        	}
				        },
				    },
				    grid: {
				        left: '8%',
				        right: '5%',
				        bottom: '3%',
				        top:'22%',
				        containLabel: true
				    },
				    yAxis: {
				        type: 'value',
				        name:'项目数',
				        nameLocation:'middle',
				        nameGap:20,
				         min:0,
				        minInterval: 1,
				       
				        nameTextStyle:{
			            	fontSize:'10'
			        	},
				        axisLabel:{//轴线刻度属性
				        	textStyle:{
				        		fontSize:'10',
				        	}
				        },
				        axisLine:{//轴线属性
					    	show: false,
				            lineStyle:{
				            color:'#999'
				        	}  
						 },
						splitLine: {//刻度辅助线
				            show: true,
				            lineStyle: {
				                color: '#ccc',
				                type: 'solid'
				            }
				       },
				    },
				    series: [
				        {
				            name: '创建',
				            type: 'line',
				            data: response.MyCreate
				        },
						{
				            name: '收到',
				            type: 'line',
				            data:response.ShowToMe
				        },
				        {
				            name: '分享',
				            type: 'line',
				            data: response.MyShare
				        },
				        
				    ]
				};
		        // 使用刚指定的配置项和数据显示图表。
		        myChart.setOption(option);
				
			})
			q.error(function(response, status, headers, config) {
				publicFunc.showAlert("温馨提示", "连接接服务器出错", "我知道了");
			});

		
		
		
		
	
		
	}
	
	$scope.getMyReport=function(){
		var url = MyProvider.domain +"/api/Statistics/GetReportCountSta?userId=" + $rootScope.userInfo._id;
		var q = $http.get(url);
			q.success(function(response, status) {
			var TimeData=response.Times;
			for(var i=0;i<TimeData.length;i++){
				TimeData[i]=$filter('date')(TimeData[i],'yyyy-MM-dd');
			}
			var myChart = echarts.init(document.getElementById('reportNow'));
		        // 指定图表的配置项和数据
			option = {
				color:['#099','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
			    title: {
			        text: '报告数',
			        left: 'left',
			        textStyle:{
			        	fontSize:'14',
			        }
			    },
			     
			   
			    xAxis: {
			        type: 'category',
			        splitLine: {show: false},
			        data: TimeData,
			        axisLine:{
				    	show: false,
			            lineStyle:{
			            color:'#999'
			        	}  
					 },
					axisLabel:{//轴线刻度属性
			        	textStyle:{
			        		fontSize:'10',
			        	}
			        },
			    },
			    grid: {
			        left: '8%',
			        right: '5%',
			        bottom: '3%',
			        top:'22%',
			        containLabel: true
			    },
			    yAxis: {
			        type: 'value',
			        name:'项目数',
			        nameLocation:'middle',
			        nameGap:20,
			        
			        minInterval: 1,
			        nameTextStyle:{
		            	fontSize:'10'
		        	},
			        axisLabel:{//轴线刻度属性
			        	textStyle:{
			        		fontSize:'10',
			        	}
			        },
			        axisLine:{//轴线属性
				    	show: false,
			            lineStyle:{
			            color:'#999'
			        	}  
					 },
					splitLine: {//刻度辅助线
			            show: true,
			            lineStyle: {
			                color: '#ccc',
			                type: 'solid'
			            }
			       },
			    },
			    tooltip: {
			        trigger: 'item',
			        formatter: '{a} <br/>{b} : {c}'
			    },
			    legend: {
				        data:['创建','分享','收到']
				},
			    series: [
			        	{
				            name: '创建',
				            type: 'line',
				            data: response.MyCreate
				        },
						{
				            name: '收到',
				            type: 'line',
				            data:response.ShowToMe
				        },
				        {
				            name: '分享',
				            type: 'line',
				            data: response.MyShare
				        },
			        
			    ]
			};
	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option);
			
				
		})
		q.error(function(response, status, headers, config) {
			publicFunc.showAlert("温馨提示", "连接接服务器出错", "我知道了");
		});
	}
	
	
	//自动加载
	$scope.getMyProject();
	$scope.getMyReport();
	
}]);