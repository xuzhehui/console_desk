const state = {
    userInfo:null,
    crumbs:[],
    pageEditData:[],
    noticeNum:0,
    ip:'http://121.41.102.225:82',
    navgationData:[
        {
            icon: "",
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
                    title: "消息列表",
                },
                {
                    icon: "",
                    id: 35,
                    page: "/cms/notice/type",
                    parent_id: 1,
                    sub: [],
                    sub_action: "0",
                    title: "类型列表",
                }
            ],
            sub_action: "0",
            title: "消息通知管理",
        }
    ]
}

export default state