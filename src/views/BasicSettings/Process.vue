<template>
    <div>
         <FullPage 
        title='工序分类'
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
                <Button type="primary" ghost icon='md-add'>新增工序分类</Button>
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
                {title:'工序分类名称',name:'Input',value:'',serverName:'title',placeholder:'请输入工序分类名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'工序分类名称',align:'center',key:'title'},
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
            this.getData(row)
        },
        searchData(row){
            this.getData(row)
        },
        getData(row){
            this.axios('/proxy/api/basics_procedure_index',{params:row}).then(res=>{
                this.tableData = res.data;
            })
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