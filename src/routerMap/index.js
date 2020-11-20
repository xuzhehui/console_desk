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


]

export default routerMap