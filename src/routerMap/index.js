const routerMap = [
    {
        path:'/cms/templatemannage/index',  
        name:'TemplateMannage',//模板管理
        meta:{index:1},
        component: resolve => require(['@/views/TemplateMannage/index'], resolve)
    },
    {
        path:'/cms/notice/type',  
        name:'Notice',//消息通知管理-->类型列表
        meta:{index:1},
        component: resolve => require(['@/views/Notice/type'], resolve)
    },
    {
        path:'/cms/notice/message',  
        name:'Notice',//消息通知管理-->消息列表
        meta:{index:2},
        component: resolve => require(['@/views/Notice/message'], resolve)
    },
    {
        path:'/cms/notice/message/edit',  
        name:'EditMessage',//消息通知管理-->消息列表
        meta:{index:3},
        component: resolve => require(['@/views/Notice/editMessage'], resolve)
    },
    {
        path:'/cms/packagepermissions/factory',  
        name:'PackageFactory',//套餐权限管理-->工厂权限管理-->工厂权限列表
        meta:{index:1},
        component: resolve => require(['@/views/packagePermissions/Factory'], resolve)
    },
    {
        path:'/cms/templatemannage/index',  
        name:'TemplateMannage',//模板管理-->模板列表
        meta:{index:1},
        component: resolve => require(['@/views/TemplateMannage/index'], resolve)
    },
    {
        path:'/cms/permissions/index',  
        name:'Permissions',//套餐管理-->套餐列表
        meta:{index:1},
        component: resolve => require(['@/views/Permissions/index'], resolve)
    },
    {
        path:'/cms/permissions/edit',  
        name:'PermissionsEdit',//套餐管理-->新增套餐
        meta:{index:2},
        component: resolve => require(['@/views/Permissions/edit'], resolve)
    },
    {
        path:'/cms/factorymannage/index',  
        name:'FactoryMannage',//工厂管理-->工厂列表
        meta:{index:2},
        component: resolve => require(['@/views/FactoryMannage/index'], resolve)
    },


]

export default routerMap