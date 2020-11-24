const state = {
    userInfo:null,
    crumbs:[],
    pageEditData:[],
    noticeNum:0,
    ip:'http://121.41.102.225:82',
    navgationData:[
        {
            icon: "#icontongzhiguanli",
            id: 35,
            page: "",
            parent_id: 0,
            sub: [
                {
                    icon: "",
                    id: 35,
                    page: "/cms/notice/message",
                    parent_id: 1,
                    sub: [],
                    sub_action: "0",
                    title: "消息通知列表",
                },
                {
                    icon: "",
                    id: 35,
                    page: "/cms/notice/type",
                    parent_id: 1,
                    sub: [],
                    sub_action: "0",
                    title: "消息类型列表",
                }
            ],
            sub_action: "0",
            title: "消息通知管理",
        },
        {
            icon: "#iconbujianguanli",
            id: 35,
            page: "",
            parent_id: 0,
            sub: [
                {
                    icon: "",
                    id: 35,
                    page: "/cms/packagepermissions/factory",
                    parent_id: 1,
                    sub: [],
                    sub_action: "0",
                    title: "工厂权限列表",
                },
            ],
            sub_action: "0",
            title: "套餐权限管理",
        },
        {
            icon: "#iconbujianguanli",
            id: 35,
            page: "",
            parent_id: 0,
            sub: [
                {
                    icon: "",
                    id: 35,
                    page: "/cms/templatemannage/index",
                    parent_id: 1,
                    sub: [],
                    sub_action: "0",
                    title: "模板列表",
                },
            ],
            sub_action: "0",
            title: "模板管理",
        },
        {
            icon: "#iconbujianguanli",
            id: 35,
            page: "",
            parent_id: 0,
            sub: [
                {
                    icon: "",
                    id: 35,
                    page: "/cms/permissions/index?type=1",
                    parent_id: 1,
                    sub: [],
                    sub_action: "0",
                    title: "工厂套餐列表",
                },
                {
                    icon: "",
                    id: 35,
                    page: "/cms/permissions/index?type=2",
                    parent_id: 1,
                    sub: [],
                    sub_action: "0",
                    title: "供应商套餐列表",
                },
                {
                    icon: "",
                    id: 35,
                    page: "/cms/permissions/index?type=3",
                    parent_id: 1,
                    sub: [],
                    sub_action: "0",
                    title: "经销商套餐列表",
                },
            ],
            sub_action: "0",
            title: "套餐管理",
        },
        {
            icon: "#iconbujianguanli",
            id: 35,
            page: "",
            parent_id: 0,
            sub: [
                {
                    icon: "",
                    id: 35,
                    page: "/cms/factorymannage/index",
                    parent_id: 1,
                    sub: [],
                    sub_action: "0",
                    title: "工厂列表",
                },
            ],
            sub_action: "0",
            title: "工厂管理",
        }
    ]
}

export default state