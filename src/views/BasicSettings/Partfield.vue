<template>
    <div>
        <Toptitle title="部件字段">
            <Button type="success" ghost icon='md-exit' style="margin-right:10px;">批量导入</Button>
            <Button type="warning" ghost icon='md-return-left'>批量导出</Button>
        </Toptitle>
        <div class="nav">
            <Topsearch :list='list' @init='init' @searchData='searchData'/>
            <Button type="primary" ghost icon='md-add'>新增部件</Button>
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