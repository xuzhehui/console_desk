const routerMap = [
    {
        path:'/cms/personnelmanagement/user',
        name:'PersonnelManagementUser',//人员管理-->用户管理
        meta:{index:3},
        component: resolve => require(['@/views/PersonnelManagement/user'], resolve)
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
        meta:{index:4},
        component: resolve => require(['@/views/PersonnelManagement/roleEdit'], resolve)
    },
    {
        path:'/cms/personnelmanagement/user/edit',
        name:'PersonnelManagementUserEdit',//人员管理-->用户管理-->新增  编辑
        meta:{index:4},
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
        path:'/cms/product/edit/parts',
        name:'ProductsEditParts',//产品管理-->通用产品编辑 新增 查看 -->新增 编辑部件
        meta:{index:4},
        component: resolve => require(['@/views/ProductMannage/editParts'], resolve)
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

]

export default routerMap