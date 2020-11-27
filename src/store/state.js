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
                    page: "",
                    parent_id: 1,
                    sub: [
                        {
                            icon: "",
                            id: 35,
                            page: "/cms/basicsettings/stock/type",
                            parent_id: 1,
                            sub: [],
                            sub_action: "0",
                            title: "存档分类",
                        },
                        {
                            icon: "",
                            id: 35,
                            page: "/cms/basicsettings/stock/unit",
                            parent_id: 1,
                            sub: [],
                            sub_action: "0",
                            title: "计量单位",
                        },
                        {
                            icon: "",
                            id: 35,
                            page: "/cms/basicsettings/stock/list",
                            parent_id: 1,
                            sub: [],
                            sub_action: "0",
                            title: "存货档案",
                        }
                    ],
                    sub_action: "0",
                    title: "存档",
                },
            ],
            sub_action: "0",
            title: "基础设置",
        },
    ]
}

export default state