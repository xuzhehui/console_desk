<template>
    <div class="user">
        <Toptitle title="用户管理" />
        <div class="nav">
            <Topsearch :list='list' @init='init' @searchData='searchData'/>
            <Button type="primary" ghost icon='md-add'>新建用户</Button>
        </div>
        <Table max-height='600' stripe border :columns="tableColums" :data="tableData">

        </Table>

        <Footer :pageIndex='pageIndex' :total='total' @change='changePage' />
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
                {title:'操作',align:'center'},
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
            this.axios('/b/c',{params:row})
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