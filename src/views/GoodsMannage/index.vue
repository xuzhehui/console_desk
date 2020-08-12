<template>
    <div>
        <FullPage 
        title='商品列表'
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
                <Button type="primary" ghost icon='md-add' @click="goPage(1)">新增商品</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon @click="goPage(2,row.row)"  size='20' style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon @click="delItems(row.row)"  size='20' style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
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
                {title:'ID',name:'Input',value:null,serverName:'id',placeholder:'请输入ID'},
                {title:'商品名称',name:'Input',value:'',serverName:'title',placeholder:'请输入物料分类名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'图片',align:'center',key:'title'},
                {title:'商品名称',align:'center',},
                {title:'通用商品价格',align:'center',},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[{id:1,}],
            pageIndex:1,
            total:100,
            searchObj:{},
        }
    },
    
    methods:{
        init(row){
            this.searchObj = row;
            this.getData(row)
        },
        searchData(row){
            this.getData(row)
        },
        getData(row){
            // this.axios('/proxy/api/basics_material_index',{params:row}).then(res=>{
            //     this.tableData = res.data;
            // })
        },
        changePage(e){
            this.pageIndex = e;
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{

                }
            })
        },
        goPage(n,row){//n = 1 新增 2 编辑 3 查看
            let id = row ? row.id : ''
            this.$router.push({
                path:'/cms/goods/edit',
                query:{
                    type:n,
                    id:id
                }
            })
        }


    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
    }
</style>