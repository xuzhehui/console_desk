const routerMap = [
    {
        path:'/cms/templatemannage/index',  
        name:'TemplateMannage',//模板管理
        meta:{index:1},
        component: resolve => require(['@/views/TemplateMannage/index'], resolve)
    },
    {
        path:'/cms/Notice/index',  
        name:'Notice',//模板管理
        meta:{index:1},
        component: resolve => require(['@/views/Notice/index'], resolve)
    },


]

export default routerMap