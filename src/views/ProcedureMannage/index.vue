<template>
    <div>
        <FullPage 
        :title='$route.query.title'
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
                <Button type="primary" ghost icon='md-add' @click="goPage(1)">新增工序</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon size='20' @click="goPage(2,row.row)" style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
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
                {title:'工序名称',name:'Input',value:'',serverName:'title',placeholder:'请输入工序名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'工序类型',align:'center',key:'title'},
                {title:'工序名称',align:'center',key:'title'},
                {title:'工时',align:'center',key:'title'},
                {title:'工价',align:'center',key:'title'},
                {title:'产能',align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            showModal:false,
            showType:1,
            classInfo:{},
            searchObj:{}
        }
    },
    mounted(){
        
    },
    methods:{
        init(row){
            this.searchObj = row;
            this.getData(row)
        },
        searchData(row){
            console.log(row)
        },
        getData(row){
            this.axios('/api/basics_parts_index').then(res=>{
                this.tableData = res.data;
            })
        },
        changePage(e){
            this.pageIndex = e;
        },
        goPage(n,row){
            let id = row ? row.id : ''
            this.$router.push({
                path:'/cms/proceduremannage/edit',
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
</style>