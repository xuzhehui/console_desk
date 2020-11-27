const routerMap = [
    {
        path:'/cms/basicsettings/stock/type',  
        name:'StockType',//套餐管理-->套餐列表
        meta:{index:1},
        component: resolve => require(['@/views/BasicSettings/Stock/type'], resolve)
    },
    {
        path:'/cms/basicsettings/stock/unit',  
        name:'StockUnit',//套餐管理-->套餐列表
        meta:{index:2},
        component: resolve => require(['@/views/BasicSettings/Stock/unit'], resolve)
    },
    {
        path:'/cms/basicsettings/stock/list',  
        name:'StockList',//套餐管理-->套餐列表
        meta:{index:3},
        component: resolve => require(['@/views/BasicSettings/Stock/list'], resolve)
    },
    {
        path:'/cms/permissions/edit',  
        name:'PermissionsEdit',//套餐管理-->新增套餐
        meta:{index:2},
        component: resolve => require(['@/views/Permissions/edit'], resolve)
    },


]

export default routerMap