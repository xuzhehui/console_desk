<template>
    <div>
        <Toptitle title="工序分类" />
        <div class="nav">
            <Topsearch :list='list' @init='init' @searchData='searchData'/>
            <Button type="primary" ghost icon='md-add'>新增工序分类</Button>
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
                {title:'工序分类名称',name:'Input',value:'',serverName:'user_name',placeholder:'请输入工序分类名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'工序分类名称',align:'center'},
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