define(['jquery', 'js/common'], function () {
	function getSystemtTitle(item) {
		if (!systemtArray[item]) {
			return systemtArray['AMC'].system + '-' + systemtArray['AMC'].systemtName;
		} else {
			return systemtArray[item].system + '-' + systemtArray[item].systemtName;
		}
	}

	function getSystemtImage(item) {
		if (!systemtArray[item]) {
			return systemtArray['AMC'].logo;
		} else {
			return systemtArray[item].logo;
		}
	}
	// 标题
	var projectTitle = {
		"homeInfo": {
			"title": "全部请求",
			"href": "../../view/management/management_all.html?v=" + storage.getLocal('kobe_version'),
		},
		"logoInfo": {
			"title": getSystemtTitle(itemCode_default), //产品名称
			"image": getSystemtImage(itemCode_default), //产品LOGO
			"href": ""
		}
	}


	var rolesMenuResult_set = {
		"spManageHomePage": {
			icon: "layui-icon layui-icon-home",
			url: "",
			target: "_self",
			hide: false
		},
		"faManageHomePage": {
			icon: "layui-icon layui-icon-tabs",
			url: "",
			target: "_self",
			hide: false
		}, //-申请管理
		"adManageHomePage": {
			icon: "layui-icon layui-icon-username",
			url: "",
			target: "_self",
			hide: false
		}, //审核首页
		"financeHomePage": {
			icon: "layui-icon layui-icon-dollar",
			url: "",
			target: "_self",
			hide: false
		}, //财务管理
		"riskHomePage": {
			icon: "layui-icon layui-icon-find-fill",
			url: "",
			target: "_self",
			hide: false
		}, //催收管理

		"collectSystemPage": {
			icon: "layui-icon layui-icon-speaker",
			url: "",
			target: "_self",
			hide: false
		}, //催收管理

		"systemdataList": {
			icon: "layui-icon layui-icon-read",
			url: "",
			hide: false
		}, //"系统报表"
		"operatePage": {
			icon: "layui-icon layui-icon-chart-screen",
			url: "",
			hide: false
		}, //运营管理
		"teleMarketManage": {
			icon: "layui-icon layui-icon-headset",
			url: "",
			hide: false
		}, //电销系统
		"riskContro": {
			icon: "layui-icon layui-icon-android",
			url: "",
			hide: false
		}, //风控管理
		"manaHomePage": {
			icon: "layui-icon layui-icon-home",
			url: "",
			hide: false
		},
		"customServcie": {
			icon: "layui-icon layui-icon-service",
			url: "",
			hide: false
		}, //客服系统
		"Information": {
			icon: "layui-icon layui-icon-chart-screen",
			url: "../user_Information/user_Information.html",
			hide: false
		}, //用户详情
		"remindManagePage": {
			icon: "layui-icon layui-icon-mike",
			url: "",
			hide: false
		}, //提醒管理
		"antiFraudPage": {
			icon: "",
			url: "",
			hide: false
		}, //反欺诈系统
		"loginoutLog": {
			icon: "layui-icon layui-icon-log",
			url: "../account_management/getUserLoginOutLogs.html",
			hide: false
		}, //登录日志管理


		"advertiseManagePage": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "",
			hide: false
		}, //投放数据系统

		"auditSystemPage": {
			icon: "layui-icon layui-icon-log",
			url: "",
			hide: false
		}, //审核系统

		"operateSystemPage": {
			icon: "layui-icon layui-icon-find-fill",
			url: "",
			hide: false
		}, //运营系统

		"customerManagePage": {
			icon: "layui-icon layui-icon-find-fill",
			url: "",
			target: "_self",
			hide: false
		}, //运营系统


		"teleMarketManage": {
			icon: "layui-icon layui-icon-find-fill",
			url: "",
			target: "_self",
			hide: false
		}, //运营系统

		'developerManaPage': {
			icon: "layui-icon layui-icon-find-fill",
			url: "",
			target: "_self",
			hide: false
		}, //开发者权限

		'teleMarketManageNew': {
			icon: "layui-icon layui-icon-find-fill",
			url: "",
			target: "_self",
			hide: false
		},

		//二级页面
		"allOrderPage": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/management/management_all.html",
			hide: false
		}, //全部请求
		"allotOrderPage": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/management/management_component.html",
			hide: false
		}, //案件分配
		"myAuditOrderPage": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/management/myAuditOrderPage.html",
			hide: false
		}, //我的订单
		"auditDataCount": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/management/auditingDataCount.html",
			hide: false
		}, //审核业绩

		"customerListPage": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/customerManagePage/customerListPage.html",
			hide: false
		}, //客户管理

		"pushOrderCasePage": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/finance/pushOrderCasePage.html",
			hide: false
		}, //平账管理

		"pushOrderLogPage": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/finance/getPushOrder.html",
			hide: false
		}, //打款记录

		"repayOrderLogPage": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/finance/repayOrderLogPage.html",
			hide: false
		}, //还款记录

		"pushErrorOrderCasePage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/finance/pushErrorOrderCasePage.html",
			hide: false
		}, //打款失败

		"pushProcessingOrderPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/finance/pushProcessingOrderPage.html",
			hide: false
		}, //打款中

		"collectWorkPage": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/collectionCase/collectWorkPage_index.html",
			hide: false
		}, //催收工作台

		"sureRepayOrderCount": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/collectionCase/sureRepayOrderCount.html",
			hide: false
		}, //催收待还看板


		"allotCasePage": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/collectionCase/collectCaseAllocation.html",
			hide: false
		}, //催收案件分配

		"myCollectCasePage": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/collectionCase/mine_CollectCase.html",
			hide: true
		}, //我的案件

		"smsLogPage": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/collectionCase/smsLogPage.html",
			hide: false
		}, //短信记录

		"collectUserManaPage": {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/collectionCase/workerManaPage.html",
			hide: false
		}, //催收账号管理
		'myDataCountPage': {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/collectionCase/myDataCountPage.html",
			hide: false
		}, //员工催回业绩详情

		'ponstOrderPage': {
			icon: "layui-icon layui-icon-templeate-1",
			url: "../../view/collectionCase/ponstOrderPage.html",
			hide: false
		}, //催收平账


		"workerManaPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/operatingSystem/workerManaPage.html",
			hide: false
		}, //员工管理
		"whitelistUser": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/operatingSystem/whitelistUser.html",
			hide: false
		}, //名单管理

		"auditUserManaPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/operatingSystem/workerManaPage.html",
			hide: false
		}, //审核账号管理


		"systemOperLogPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/spManageHomePage/systemOperLogPage.html",
			hide: false
		}, //操作日志

		'itemDataInfoPage': {
			icon: "layui-icon layui-icon-user",
			url: "../../view/spManageHomePage/itemDataInfoPage.html",
			hide: false
		}, //客服配置

		"loanRepayDataPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/spManageHomePage/loanRepayDataPage.html",
			hide: false
		}, //每日借款还款

		"everDayMonitorPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/spManageHomePage/everDayMonitorPage.html",
			hide: false
		}, //每日进件

		"operationDataExportManagePage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/spManageHomePage/operationDataExportManagePage.html",
			hide: false
		}, //运营数据导出

		"partnerCostPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/spManageHomePage/partnerCostPage.html",
			hide: false
		}, //操作日志

		"everDayProfitPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/spManageHomePage/everDayProfitPage.html",
			hide: false
		}, //每日运营

		'getOtpCode': {
			icon: "layui-icon layui-icon-user",
			url: "../../view/spManageHomePage/getOtpCode.html",
			hide: false
		}, //查看验证码

		"newUserProcedureMonitorPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/spManageHomePage/newUserProcedureMonitorPage.html",
			hide: false
		}, //新客注册申请放款监控

		"platformDataPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/spManageHomePage/platformDataPage.html",
			hide: false
		}, // 平台统计
		'everDayMonitorPage': {
			icon: "layui-icon layui-icon-user",
			url: "../../view/spManageHomePage/everDayMonitorPage.html",
			hide: false
		}, //每日进件


		"platformBusinessPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/spManageHomePage/platformBusinessPage.html",
			hide: true
		}, // 平台盈收统计

		"collectGroupPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/collectionCase/collectGroupPage.html",
			hide: false
		}, // 催收分组统计

		"collectDataCountPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/collectionCase/collectDataCountPage.html",
			hide: false
		}, //催收业绩统计

		'phaseDataCountPage': {
			icon: "layui-icon layui-icon-user",
			url: "../../view/collectionCase/phaseDataCountPage.html",
			hide: false
		}, //阶段业绩统计

		// "remindDataCountPage"
		// "overdueDataCountPage"

		"remindDataCountPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/collectionCase/remindDataCountPage.html",
			hide: false
		}, // 提醒业绩统计
		"overdueDataCountPage": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/collectionCase/overdueDataCountPage.html",
			hide: false
		}, // 催收业绩统计
		"nearPlatfromDataCount": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/collectionCase/nearPlatfromDataCount.html",
			hide: false
		}, //到期业绩看板

		"advertiseDataCount": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/advertiseManagePage/index.html",
			hide: false
		}, // 投放绩效统计

		"404": {
			icon: "layui-icon layui-icon-user",
			url: "../../view/404/404.html",
			hide: false
		}, // 404


		"teleMarketHome": {
			icon: "layui-icon layui-icon-home",
			url: "../../view/teleMarketManage/index.html",
			hide: false
		}, //首页
		"teleWorkerManage": {
			icon: "layui-icon layui-icon-username",
			url: "../../view/teleMarketManage/teleWorkerManage.html",
			hide: false
		}, //员工管理
		"allotTeleMarketManage": {
			icon: "layui-icon layui-icon-cellphone",
			url: "../../view/teleMarketManage/allotTeleMarketManage.html",
			hide: false
		}, //分配管理
		"serviceFeeTelMarket": {
			icon: "layui-icon layui-icon-cellphone",
			url: "../../view/teleMarketManage/serviceFeeTelMarket.html",
			hide: true
		}, //服务费统计
		"telemarkMobileDetail": {
			icon: "layui-icon layui-icon-form",
			url: "../../view/teleMarketManage/telemarkMobileDetail.html",
			hide: false
		},

		"telemarkWorkWindow": {
			icon: "layui-icon layui-icon-layouts",
			url: "../../view/teleMarketManage/pc_user.html",
			hide: false
		},

		'teleMaketTeamDataList': {
			icon: "layui-icon layui-icon-home",
			url: "../../view/teleMarketManage/TeamLeaderReport.html",
			hide: false
		},

		"fullTelemarketPerformance": {
			icon: "layui-icon layui-icon-table",
			url: "../../view/teleMarketManage/fullTelemarketPerformance.html",
			hide: false
		},

		"newTelemarketTeamDataList": {
			icon: "layui-icon layui-icon-chart-screen",
			url: "../../view/teleMarketManage/newTelemarketTeamDataList.html",
			hide: false
		},

		"teleMarketGroup": {
			icon: "layui-icon layui-icon-cols",
			url: "../../view/teleMarketManage/user_groupManage.html",
			hide: false
		}, //分组管理

		'appPageSet': {
			icon: "layui-icon ",
			url: "../../view/developerManaPage/appPageSet.html",
			hide: false
		}, //app页面配置

		//新营销
		'teleMarketGroupNew': {
			icon: "layui-icon ",
			url: "../../view/teleMarketManageNew/teleMarketGroupNew.html",
			hide: false
		}, //分组管理

		'teleWorkerManageNew': {
			icon: "layui-icon ",
			url: "../../view/teleMarketManageNew/teleWorkerManageNew.html",
			hide: false
		}, //员工管理

		'allotTeleMarketManageNew': {
			icon: "layui-icon ",
			url: "../../view/teleMarketManageNew/allotTeleMarketManageNew.html",
			hide: false
		}, //分配管理
		'telemarkWorkWindowNew': {
			icon: "layui-icon ",
			url: "../../view/teleMarketManageNew/telemarkWorkWindowNew.html",
			hide: false
		}, //营销工作台

		'teleMaketTeamDataListNew': {
			icon: "layui-icon ",
			url: "../../view/teleMarketManageNew/teleMaketTeamDataList.html",
			hide: false
		}, //小组长报表

		'telemarkMobileDetailNew': {
			icon: "layui-icon ",
			url: "../../view/teleMarketManageNew/telemarkMobileDetailNew.html",
			hide: false
		}, //营销手机号业绩

		'teleMarketHomeNew': {
			icon: "layui-icon ",
			url: "../../view/teleMarketManageNew/teleMarketHomeNew.html",
			hide: false
		}, //营销首页
		'fullTelemarketPerformanceNew': {
			icon: "layui-icon ",
			url: "../../view/teleMarketManageNew/fullTelemarketPerformanceNew.html",
			hide: false
		}, //营销员工业绩统计


		'getExtensionOperateHistory': {
			icon: "layui-icon ",
			url: "../../view/finance/getExtensionOperateHistory.html",
			hide: false
		}, //展期操作记录
		'getPayMoreOperateHistory': {
			icon: "layui-icon ",
			url: "../../view/finance/getPayMoreOperateHistory.html",
			hide: false
		}, //多还操作记录
		'getWrongRepayOperateHistory': {
			icon: "layui-icon ",
			url: "../../view/finance/getWrongRepayOperateHistory.html",
			hide: false
		}, //还错操作记录
		'refundOperate': {
			icon: "layui-icon ",
			url: "../../view/finance/refundOperate.html",
			hide: false
		}, //还错操作记录
		'manualHandlingPushOrderLog': {
			icon: "layui-icon ",
			url: "../../view/finance/ManualProcessingOfRecords.html",
			hide: false
		}, //人工个合计记录
		"flowAdvertisingDayDateManagePage": {
			icon: "layui-icon ",
			url: "../../view/advertiseManagePage/flowAdvertisingDayDateManagePage.html",
			hide: false
		},
		"userBankManaPage":{icon:"",url:"../finance/userBankManaPage.html",hide:false},//-银行卡
		"allOrderDataPage":{icon:"",url:"../finance/allOrderDataPage.html",hide:false},//全部案件
		"collectionMonitoring": { icon: "layui-icon layui-icon-user", url: "../../view/collectionCase/collectionMonitoring.html", hide: false },
	}

	var roleCode_default = {

	}

	//[
	// {menuId: 1, menuCode: "spManageHomePage", showName: "超管首页", parentid: 0},
	// {menuId: 2, menuCode: "faManageHomePage", showName: "财审首页", parentid: 0},
	// {menuId: 3, menuCode: "adManageHomePage", showName: "审核首页", parentid: 0},
	// {menuId: 4, menuCode: "financeHomePage", showName: "财务首页", parentid: 0},
	// {menuId: 5, menuCode: "riskHomePage", showName: "风控首",parentid: 0},
	//  	{
	//  		pageLevel:1,
	//  		menus:[
	//  			{
	//           	hide: false,
	// 		icon: "layui-icon-username",
	// 		menuCode: "getUserList",
	// 		menuId: 6,
	// 		pageLevel: 1,
	// 		parentid: 0,
	// 		roleCode: "",
	// 		showName: "用户管理",
	// 		tatalDataUrl: "",
	// 	},
	//      		{
	//           	hide: false,
	// 		icon: "layui-icon-templeate-1",
	// 		menuCode: "strategySet",
	// 		menuId: 1,
	// 		pageLevel: 1,
	// 		parentid: 0,
	// 		showName: "策略集",
	// 	},
	// 	{
	//           	hide: false,
	// 		icon: "layui-icon-home",
	// 		menuCode: "decisionConfiguration",
	// 		menuId: 2,
	// 		pageLevel: 1,
	// 		parentid: 0,
	// 		showName: "决策配置",
	// 		tatalDataUrl: "",
	// 	},
	// 	{
	//           	hide: false,
	// 		icon: "layui-icon-home",
	// 		menuCode: "modelDeployment",
	// 		menuId: 3,
	// 		pageLevel: 1,
	// 		parentid: 0,
	// 		roleCode: "SUPER_MANAGER",
	// 		showName: "模型部署",
	// 		tatalDataUrl: "",
	// 	},
	// 	{
	//           	hide: false,
	// 		icon: "layui-icon-home",
	// 		menuCode: "dataSource",
	// 		menuId: 4,
	// 		pageLevel: 1,
	// 		parentid: 0,
	// 		roleCode: "SUPER_MANAGER",
	// 		showName: "数据源配置",
	// 		tatalDataUrl: "",
	// 	},
	// 	{
	//           	hide: false,
	// 		icon: "layui-icon-home",
	// 		menuCode: "operationLog",
	// 		menuId: 5,
	// 		pageLevel: 1,
	// 		parentid: 0,
	// 		roleCode: "SUPER_MANAGER",
	// 		showName: "操作日志",
	// 		tatalDataUrl: "",
	// 	},

	// ],
	//  	},
	//  	{
	//  		pageLevel:2,
	//  		menus:[
	//      		{
	//           	hide: false,
	// 		icon: "layui-icon-templeate-1",
	// 		menuCode: "strategyVersion",
	// 		menuId: 101,
	// 		pageLevel: 1,
	// 		parentid: 1,
	// 		showName: "策略版本",
	// 	},
	// 	{
	//           	hide: false,
	// 		icon: "",
	// 		menuCode: "template",
	// 		menuId: 102,
	// 		pageLevel: 1,
	// 		parentid: 1,
	// 		showName: "规则库",
	// 		tatalDataUrl: "",
	// 	},
	// 	{
	//           	hide: false,
	// 		icon: "",
	// 		menuCode: "decisionConfigurationList",
	// 		menuId: 202,
	// 		pageLevel: 2,
	// 		parentid: 2,
	// 		showName: "决策列表",
	// 		tatalDataUrl: "",
	// 	},
	// 	{
	//           	hide: false,
	// 		icon: "",
	// 		menuCode: "ruleRequestResult",
	// 		menuId: 501,
	// 		pageLevel: 2,
	// 		parentid: 5,
	// 		showName: "规则请求结果列表",
	// 		tatalDataUrl: "",
	// 	},
	// ],
	//  	},
	//  	{
	//  		pageLevel:3,
	//  		menus:[
	//      		{
	//           	hide: false,
	// 		icon: "layui-icon-templeate-1",
	// 		menuCode: "",
	// 		menuId: 1001,
	// 		pageLevel: 3,
	// 		parentid:0,
	// 		showName: "策略版本",
	// 	},
	// 	{
	//           	hide: false,
	// 		icon: "",
	// 		menuCode: "",
	// 		menuId: 1002,
	// 		pageLevel: 3,
	// 		parentid: 0,
	// 		showName: "规则列表",
	// 		tatalDataUrl: "",
	// 	},
	// ],
	//  	}
	//];

	return {
		projectTitle: projectTitle, //标题
		// menuListData:menuListData,//菜单url地址
		rolesMenuResult_set: rolesMenuResult_set, //菜单参数设置
	};

})