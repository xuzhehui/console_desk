<template>
    <div>
        <FullPage 
        title='部件字段'
        :list='list' 
        @init='init' 
        @searchData='searchData' 
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='titleButton'>
                <Button type="success" ghost icon='md-exit' style="margin-right:10px;">批量导入</Button>
                <Button type="warning" ghost icon='md-return-left'>批量导出</Button>
            </div>
            <div slot='navButton'>
                <Button type="primary" ghost icon='md-add'>新增部件</Button>
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
                {title:'部件名称',name:'Input',value:'',serverName:'user_name',placeholder:'请输入部件名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'部件名称',align:'center'},
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
        },
        searchData(row){
            console.log(row)
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