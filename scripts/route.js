//路由
myApp.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	//home
		.state('home', {
			url: "/home",
			templateUrl: "views/home/home.html",

		})
		.state('login', {
			url: "/login",
			templateUrl: "views/home/login.html",

		})
		.state('register', {
			url: "/register",
			templateUrl: "views/home/register.html",

		})
		.state('forgetPwd', {
			url: "/forgetPwd",
			templateUrl: "views/home/forgetPwd.html",

		})

	//用户中心
	.state('tabs.UserMag', {
        url: "/UserMag",
    	views: {
    	    'User-tab': {
    	        templateUrl: "views/UserM/UserMag.html",
    	    }
    	}
    })
	//用户设置
	.state('seting', {
		url: "/seting",
		controller: "seting_ctr",
		templateUrl: "views/userM/seting.html",

	})
		//用户设置
	.state('massage', {
		url: "/massage",
		controller: "massage_ctr",
		templateUrl: "views/userM/massage.html",

	})

	.state('tabs', {
			url: "/tabs",
			abstract: true,
			templateUrl: "views/main.html"
		})
		//首页______________________________________________
		.state('tabs.gains', {
			url: "/gains",
			views: {
				'gains-tab': {
					templateUrl: "views/gains/gains.html",

				}
			}
		})
	
		//项目管理____________________________________________
		.state('tabs.project', {
			url: "/project",
			cache:'false', //刷新数据
			views: {
				'project-tab': {
					templateUrl: "views/project/project.html",

				}
			}
		})
		//添加项目
		.state('addProject', {
			url: "/addProject",
			controller: "addProject_ctr",
			templateUrl: "views/project/addProject.html",
		})
		
		//选择项目
		.state('modelselect', {
			url: "/modelselect",
			controller: "modelselect_ctr",
			templateUrl: "views/project/modelselect.html",
		})
		
		//项目细节--百度
		.state('projectN', {
			cache:'false', 
			url: "/projectN?project",
			controller: "projectN_ctr",
			templateUrl: "views/project/projectN.html",
		})
		//项目细节--微信
		.state('projectWCn', {
			cache:'false', 
			url: "/projectWCn?project",
			controller: "projectWCn_ctr",
			templateUrl: "views/project/projectWCn.html",

		})
		//项目细节--微博
		.state('projectWBn', {
			cache:'false', 
			url: "/projectWBn?project",
			controller: "projectWBn_ctr",
			templateUrl: "views/project/projectWBn.html",

		})
		//搜索详情
		.state('searchList', {
			cache:'false', 
			url: "/searchList?project",
			controller: "searchList_ctr",
			templateUrl: "views/project/searchList.html",

		})
		//推广服务
		.state('BusinessPromotion', {
			cache:'false', 
			url: "/BusinessPromotion",
			controller: "BusinessPromotion_ctr",
			templateUrl: "views/AdvertisingPage/BusinessPromotion.html",
		})
		
		//社区____________________________________________
		.state('tabs.community', {
			url: "/community",
			views: {
				'community-tab': {
					templateUrl: "views/community/community.html",

				}
			}
		})

	
	
	$urlRouterProvider.otherwise("/home");
})