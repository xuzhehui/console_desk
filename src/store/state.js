const state = {
    userInfo:{},
    crumbs:[],
    navgationData:[
        {
            title:'部件管理',
            sub:[
                {title:'部件列表',page:'PartsManageHome'}
            ]
        },
        {
            title:'物料管理',
            sub:[
                {title:'木材',page:'MaterialMannage'}
            ]
        },
        {
            title:'基础设置',
            sub:[
                {title:'物料分类字段',page:'Materialfield'},
                {title:'工艺属性字段',page:'Technology'},
                {title:'工序分类字段',page:'Process'},
                {title:'产品分类字段',page:'Productfield'},
                {title:'测量字段',page:'Measure'},
                {title:'部件字段',page:'Partfield'},
            ]
        },
        // {
        //     title:'财务管理',
        //     sub:[
        //         {title:'子菜单1'},
        //         {title:'子菜单2'},
        //         {
        //             title:'子菜单3',
        //             sub:[
        //                 {title:'三级菜单1'},
        //                 {title:'三级菜单2'}
        //             ]
                
        //         },
        //     ]
        // },
        {
            title:'人员管理',
            sub:[
                {title:'用户管理',page:'PersonnelManagementUser'},
                {title:'角色管理',page:'PersonnelManagementRole'},
            ]
        }
    ]
}

export default state