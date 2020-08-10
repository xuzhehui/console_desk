<template>
    <div class="user">
        <FullPage 
        title='用户管理'
        :list='list' 
        @init='init' 
        @searchData='searchData' 
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='navButton'>
                <Button type="primary" ghost icon='md-add'>新增用户</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon size='20' style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon size='20' style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
                </div>
            </template>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'ID',name:'Input',value:2,serverName:'id',placeholder:'请输入ID'},
                {title:'用户名',name:'Input',value:'',serverName:'user_name',placeholder:'请输入用户名'},
                {title:'角色类型',name:'Select',serverName:'type',value:'',option:[
                    {label:'管理员',value:1},
                    {label:'游客',value:2}
                ]}
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'用户名',align:'center'},
                {title:'登录密码',align:'center'},
                {title:'手机号',align:'center'},
                {title:'角色名',align:'center'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[
                {id:'1'},{id:'1'},{id:'1'},{id:'1'},{id:'1'},{id:'1'},{id:'1'},{id:'1'},{id:'1'},{id:'1'},{id:'1'},
            ],
            pageIndex:1,
            total:100,
        }
    },
    methods:{
        init(row){
            console.log(row)
            this.axios('/proxy/api/material_index',{params:row})
        },
        searchData(row){

        },
        changePage(e){
            this.pageIndex = e;
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
</style>