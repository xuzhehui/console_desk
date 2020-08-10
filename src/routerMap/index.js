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
]

export default routerMap