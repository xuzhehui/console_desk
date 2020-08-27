<template>
    <div>
        <FullPage 
        title='工艺列表'
        :list='list' 
        @init='init' 
        :loading='loading'
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
                <Button @click="goPage(1)" type="primary" ghost icon='md-add'>新增工艺</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon @click="goPage(2,row.row)" size='20' style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
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
                {title:'ID',name:'Input',value:'',serverName:'id',placeholder:'请输入ID'},
                {title:'工艺组合名称',name:'Input',value:'',serverName:'',placeholder:'请输入工艺组合名称'},
            ],
            tableColums:[],
            tableData:[],
            pageIndex:1,
            total:100,
            loading:false,
        }
    },
    methods:{
        init(row){
            this.getData(row)
        },
        searchData(row){
            console.log(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/process_route_index',{params:row}).then(res=>{
                this.loading = false;
                this.tableColums = res.data.top;
                this.tableData = res.data.detail;
            })
        },
        changePage(e){
            this.pageIndex = e;
        },
        goPage(n,row){
            let id = row ? row.id : '' 
            this.$router.push({
                path:'/cms/processroute/edit',
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

</style>