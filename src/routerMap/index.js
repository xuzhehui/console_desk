const routerMap = [
    {
        path:'/cms/home',
        name:'Home',//首页
        meta:{index:3},
        component: resolve => require(['@/views/Home/index'], resolve)
    },
    {
        path:'/cms/notice/index',
        name:'Notice',//基础设置-->消息通知内容
        meta:{index:3},
        component: resolve => require(['@/views/Notice/index'], resolve)
    },
    {
        path:'/cms/notice/menote',
        name:'MeNote',//首页-->消息列表
        meta:{index:3,NoPadding:true},
        component: resolve => require(['@/views/Notice/Menote'], resolve)
    },
    {
        path:'/cms/personnelmanagement/user',
        name:'PersonnelManagementUser',//人员管理-->用户管理
        meta:{index:3},
        component: resolve => require(['@/views/PersonnelManagement/user'], resolve)
    },
    {
        path:'/cms/finance/index',
        name:'Finance',//财务-->首页
        meta:{index:3},
        component: resolve => require(['@/views/Finance/index'], resolve)
    },
    {
        path:'/cms/finance/month',
        name:'FinanceMonth',//财务-->月份
        meta:{index:3},
        component: resolve => require(['@/views/Finance/month'], resolve)
    },
    {
        path:'/cms/finance/salary',
        name:'FinanceSalary',//财务-->月份-->工人工资
        meta:{index:3},
        component: resolve => require(['@/views/Finance/salaryDetails'], resolve)
    },
    {
        path:'/cms/finance/production',
        name:'ProductionCharts',//财务-->生产产值表
        meta:{index:2,NoPadding:true},
        component: resolve => require(['@/views/Finance/productionCharts/index'], resolve)
    },
    {
        path:'/cms/finance/production/details',
        name:'ProductionChartsDetsil',//财务-->生产产值表-->产值表详情
        meta:{index:2,NoPadding:true},
        component: resolve => require(['@/views/Finance/productionCharts/details'], resolve)
    },
    {
        path:'/cms/personnelmanagement/role',
        name:'PersonnelManagementRole',//人员管理-->角色管理
        meta:{index:4},
        component: resolve => require(['@/views/PersonnelManagement/role'], resolve)
    },
    {
        path:'/cms/personnelmanagement/role/edit',
        name:'PersonnelManagementRoleEdit',//人员管理-->角色管理-->新增  编辑
        meta:{index:5},
        component: resolve => require(['@/views/PersonnelManagement/roleEdit'], resolve)
    },
    {
        path:'/cms/personnelmanagement/user/edit',
        name:'PersonnelManagementUserEdit',//人员管理-->用户管理-->新增  编辑
        meta:{index:6},
        component: resolve => require(['@/views/PersonnelManagement/userEdit'], resolve)
    },
    {
        path:'/cms/basicsettings/materialfield',
        name:'Materialfield',//基础设置-->物料分类字段
        meta:{index:4},
        component: resolve => require(['@/views/BasicSettings/Materialfield'], resolve)
    },
    {
        path:'/cms/basicsettings/technology',
        name:'Technology',//基础设置-->工艺属性字段
        meta:{index:4},
        component: resolve => require(['@/views/BasicSettings/Technology'], resolve)
    },
    {
        path:'/cms/basicsettings/process',
        name:'Process',//基础设置-->工序分类字段
        meta:{index:4},
        component: resolve => require(['@/views/BasicSettings/Process'], resolve)
    },
    {
        path:'/cms/basicsettings/productfield',
        name:'Productfield',//基础设置-->产品分类字段
        meta:{index:4},
        component: resolve => require(['@/views/BasicSettings/Productfield'], resolve)
    },
    {
        path:'/cms/basicsettings/measure',
        name:'Measure',//基础设置-->测量字段
        meta:{index:4},
        component: resolve => require(['@/views/BasicSettings/Measure'], resolve)
    },
    {
        path:'/cms/basicsettings/partfield',
        name:'Partfield',//基础设置-->部件字段
        meta:{index:4},
        component: resolve => require(['@/views/BasicSettings/Partfield'], resolve)
    },
    {
        path:'/cms/partsmannage/list',
        name:'PartsManageHome',//部件管理-->部件列表
        meta:{index:4},
        component: resolve => require(['@/views/PartsMannage/index'], resolve)
    },
    {
        path:'/cms/partsmannage/edit',
        name:'PartsManageHomeEdit',//部件管理-->部件列表-->部件编辑-新增-查看
        meta:{index:4},
        component: resolve => require(['@/views/PartsMannage/edit'], resolve)
    },
    {
        path:'/cms/materialmannage/index',
        name:'MaterialMannage',//物料管理-->部件列表
        meta:{index:4},
        component: resolve => require(['@/views/MaterialMannage/index'], resolve)
    },
    {
        path:'/cms/materialmannage/edit',
        name:'MaterialMannageEdit',//物料管理-->部件列表-->编辑-新增-查看
        meta:{index:4},
        component: resolve => require(['@/views/MaterialMannage/edit'], resolve)
    },
    {
        path:'/cms/processroute/index',
        name:'ProcessRoute',//工艺路线-->工艺列表
        meta:{index:4},
        component: resolve => require(['@/views/ProcessRoute/index'], resolve)
    },
    {
        path:'/cms/processroute/edit',
        name:'ProcessRouteEdit',//工艺路线-->工艺列表-->新增编辑工艺
        meta:{index:4},
        component: resolve => require(['@/views/ProcessRoute/edit'], resolve)
    },
    {
        path:'/cms/goods/index',
        name:'Goods',//商品管理-->商品列表
        meta:{index:4},
        component: resolve => require(['@/views/GoodsMannage/index'], resolve)
    },
    {
        path:'/cms/goods/edit',
        name:'GoodsEdit',//商品管理-->商品列表-->新增 编辑 查看
        meta:{index:4},
        component: resolve => require(['@/views/GoodsMannage/edit'], resolve)
    },
    {
        path:'/cms/product/index',
        name:'Products',//产品管理-->通用产品页
        meta:{index:4},
        component: resolve => require(['@/views/ProductMannage/index'], resolve)
    },
    {
        path:'/cms/product/edit',
        name:'ProductsEdit',//产品管理-->通用产品编辑 新增 查看
        meta:{index:4},
        component: resolve => require(['@/views/ProductMannage/edit'], resolve)
    },
    {
        path:'/cms/processmannage/index',
        name:'ProcessMannage',//工艺属性
        meta:{index:4},
        component: resolve => require(['@/views/ProcessMannage/index'], resolve)
    },
    {
        path:'/cms/proceduremannage/index',
        name:'ProcedureMannage',//工序管理通用页面
        meta:{index:4},
        component: resolve => require(['@/views/ProcedureMannage/index'], resolve)
    },
    {
        path:'/cms/proceduremannage/edit',
        name:'ProcedureMannageEdit',//工序管理通用页面 --> 新增--编辑
        meta:{index:4},
        component: resolve => require(['@/views/ProcedureMannage/edit'], resolve)
    },
    {
        path:'/cms/productionorderlist/inboundform/index',
        name:'InboundForm',//生产订单列表-->入库表
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/InboundForm/index'], resolve)
    },
    {
        path:'/cms/productionorderlist/inboundform/details',
        name:'InboundFormDetails',//生产订单列表-->入库表详情
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/InboundForm/details'], resolve)
    },
    {
        path:'/cms/productionorderlist/deliverylist/deliverylist',
        name:'DeliveryList',//生产订单列表-->出库表
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/Deliverylist/Deliverylist'], resolve)
    },
    {
        path:'/cms/productionorderlist/deliverylist/decorationlist',
        name:'Decorationlist',//生产订单列表-->出库表-->工装家装订单列表
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/Deliverylist/Decorationlist'], resolve)
    },
    {
        path:'/cms/productionorderlist/deliverylist/decorationorderdetails',
        name:'DecorationOrderDetails',//生产订单列表-->出库表-->工装家装订单列表-->工装家装订单详情
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/Deliverylist/DecorationOrderDetails'], resolve)
    },
    {
        path:'/cms/productionorderlist/deliverylist/partsdetails',
        name:'PartsDetails',//生产订单列表-->出库表-->工装家装订单列表-->工装家装订单详情-->部件详情
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/Deliverylist/PartsDetails'], resolve)
    },
    {
        path:'/cms/productionorderlist/completionlist/list',
        name:'Completionlist',//生产订单列表-->完工单
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/Completionlist/list'], resolve)
    },
    {
        path:'/cms/productionorderlist/completionlist/decorationlist',
        name:'CompletionlistDecorationlist',//生产订单列表-->完工单-->工装家装订单列表
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/Completionlist/Decorationlist'], resolve)
    },
    {
        path:'/cms/productionorderlist/completionlist/details',
        name:'CompletionlistDecorationlistDetails',//生产订单列表-->完工单-->工装家装订单列表-->订单详情
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/Completionlist/Details'], resolve)
    },
    {
        path:'/cms/productionorderlist/dispatchlist/list',
        name:'DispatchlistList',//生产订单列表-->派工单
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/Dispatchlist/list'], resolve)
    },
    {
        path:'/cms/productionorderlist/dispatchlist/details',
        name:'DispatchlistDetails',//生产订单列表-->派工单--派工单详情
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/Dispatchlist/details'], resolve)
    },
    {
        path:'/cms/productionorderlist/productionplanlist/list',
        name:'ProductionPlanlistList',//生产订单列表-->生产计划列表
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/ProductionPlanlist/list'], resolve)
    },
    {
        path:'/cms/productionorderlist/productionplanlist/details',
        name:'ProductionPlanlistDetails',//生产订单列表-->生产计划列表-->生产计划订单详情
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/ProductionPlanlist/details'], resolve)
    },
    {
        path:'/cms/productionorderlist/productionsorder/list',
        name:'ProductionOrderList',//生产订单列表-->生产订单列表
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/ProductionsOrder/list'], resolve)
    },
    {
        path:'/cms/productionorderlist/productionsorder/Decorationlist',
        name:'ProductionOrderDecorationlist',//生产订单列表-->生产订单列表-->生产计划订单详情
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/ProductionsOrder/Decorationlist'], resolve)
    },
    {
        path:'/cms/productionorderlist/productionsorder/details',
        name:'ProductionOrderDetails',//生产订单列表-->生产订单列表-->生产计划订单详情-->编辑与查看
        meta:{index:4},
        component: resolve => require(['@/views/ProductionOrderList/ProductionsOrder/details'], resolve)
    },
    {
        path:'/cms/ordermannage/businessorderlist/list',
        name:'BusinessOrderlist',//订单管理-->业务订单列表
        meta:{index:4},
        component: resolve => require(['@/views/OrderMannage/BusinessOrderlist/list'], resolve)
    },
    {
        path:'/cms/ordermannage/businessorderlist/decorationlist',
        name:'BusinessOrderDecorationlist',//订单管理-->业务订单列表-->工装订单列表
        meta:{index:4},
        component: resolve => require(['@/views/OrderMannage/BusinessOrderlist/Decorationlist'], resolve)
    },
    {
        path:'/cms/ordermannage/businessorderlist/details',
        name:'BusinessOrderDetails',//订单管理-->业务订单列表-->家装工装订单列表-->家装工装订单详情
        meta:{index:4},
        component: resolve => require(['@/views/OrderMannage/BusinessOrderlist/details'], resolve)
    },
    {
        path:'/cms/ordermannage/businessorderlist/edit',
        name:'BusinessOrderEdit',//订单管理-->业务订单列表-->新增编辑订单
        meta:{index:4},
        component: resolve => require(['@/views/OrderMannage/BusinessOrderlist/edit'], resolve)
    },
    {
        path:'/cms/ordermannage/businessorderlist/agentorder',
        name:'AgentOrder',//订单管理-->业务订单列表-->代理商新增编辑订单
        meta:{index:4},
        component: resolve => require(['@/views/OrderMannage/BusinessOrderlist/agentOrder'], resolve)
    },
    {
        path:'/cms/approval/list',
        name:'Approvallist',//审批-->审批列表
        meta:{index:4},
        component: resolve => require(['@/views/Approval/list'], resolve)
    },
    {
        path:'/cms/approval/agentorders',
        name:'ApprovaAgentOrder',//审批-->代理商列表
        meta:{index:4},
        component: resolve => require(['@/views/Approval/agentOrders'], resolve)
    },
    {
        path:'/cms/approval/examine',
        name:'ApprovalExamine',//审批-->审批详情
        meta:{index:4},
        component: resolve => require(['@/views/Approval/examine'], resolve)
    },
    {
        path:'/cms/approval/frock',
        name:'ApprovaFrock',//审批-->审批列表-->工装审批列表
        meta:{index:4},
        component: resolve => require(['@/views/Approval/frock'], resolve)
    },
    {
        path:'/cms/approval/details',
        name:'ApprovaDetails',//审批-->审批列表-->工装审批列表-->审批详情
        meta:{index:4},
        component: resolve => require(['@/views/Approval/details'], resolve)
    },
    {
        path:'/cms/measurementordermannage/list',
        name:'MeasurementOrderMannagelist',//测量订单管理-->订单列表
        meta:{index:4},
        component: resolve => require(['@/views/MeasurementOrderMannage/list'], resolve)
    },
    {
        path:'/cms/measurementordermannage/Decorationlist',
        name:'MeasurementOrderMannageDecorationlist',//测量订单管理-->订单列表-->工装订单列表
        meta:{index:4},
        component: resolve => require(['@/views/MeasurementOrderMannage/Decorationlist'], resolve)
    },
    {
        path:'/cms/measurementordermannage/edit',
        name:'MeasurementOrderMannageEdit',//测量订单管理-->订单列表-->编辑订单
        meta:{index:4},
        component: resolve => require(['@/views/MeasurementOrderMannage/edit'], resolve)
    },
    {
        path:'/cms/mountorder/index',  
        name:'MountOrder',//安装订单
        meta:{index:1},
        component: resolve => require(['@/views/MountOrder/index'], resolve)
    },
    {
        path:'/cms/mountorder/details',  
        name:'MountOrderDetails',//安装订单--->安装订单详情
        meta:{index:1},
        component: resolve => require(['@/views/MountOrder/details'], resolve)
    },
    {
        path:'/cms/chipmannage/index',  
        name:'Chip',//芯片列表
        meta:{index:1},
        component: resolve => require(['@/views/ChipMannage/index'], resolve)
    },
    {
        path:'/cms/rawmateria/index',  
        name:'RawMateria',//原材料预算
        meta:{index:1},
        component: resolve => require(['@/views/RawMateria/index'], resolve)
    },
    {
        path:'/cms/templatemannage/index',  
        name:'TemplateMannage',//模板管理
        meta:{index:1},
        component: resolve => require(['@/views/TemplateMannage/index'], resolve)
    },

]

export default routerMap